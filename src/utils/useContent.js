import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase.js'

let globalCache = null
let globalListeners = []

function notifyListeners() {
  globalListeners.forEach(fn => fn(globalCache))
}

async function loadAllContent() {
  const { data, error } = await supabase
    .from('site_content')
    .select('key, value')
  if (error) return null
  const map = {}
  data.forEach(row => { map[row.key] = row.value })
  globalCache = map
  notifyListeners()
  return map
}

export function useContent() {
  const [content, setContent] = useState(globalCache)
  const [loading, setLoading] = useState(!globalCache)

  useEffect(() => {
    const listener = (newContent) => setContent({ ...newContent })
    globalListeners.push(listener)

    if (!globalCache) {
      loadAllContent().then(() => setLoading(false))
    } else {
      setLoading(false)
    }

    return () => {
      globalListeners = globalListeners.filter(l => l !== listener)
    }
  }, [])

  const get = useCallback((key, fallback = '') => {
    if (!content) return fallback
    return content[key] !== undefined ? content[key] : fallback
  }, [content])

  const update = useCallback(async (key, value) => {
    const { error } = await supabase
      .from('site_content')
      .upsert({ key, value, section: key.split('.')[0], updated_at: new Date().toISOString() }, { onConflict: 'key' })
    if (!error) {
      globalCache = { ...globalCache, [key]: value }
      notifyListeners()
    }
    return !error
  }, [])

  const updateMany = useCallback(async (updates) => {
    const rows = Object.entries(updates).map(([key, value]) => ({
      key,
      value,
      section: key.split('.')[0],
      updated_at: new Date().toISOString()
    }))
    const { error } = await supabase
      .from('site_content')
      .upsert(rows, { onConflict: 'key' })
    if (!error) {
      globalCache = { ...globalCache, ...updates }
      notifyListeners()
    }
    return !error
  }, [])

  return { content, loading, get, update, updateMany }
}

export async function prefetchContent() {
  if (!globalCache) await loadAllContent()
}
