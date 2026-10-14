import React, { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/react-start'
import type { NavCategory } from '../types/navigation'
import initialCategories from '../../public/data.json'

const getCategories = createServerFn({ method: 'GET' }).handler(async () => {
  return initialCategories as NavCategory[]
})

export const Route = createFileRoute('/')({
  component: NavigationHub,
})

const fetchNavigationData = async (): Promise<NavCategory[]> => {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/data.json')
      if (res.ok) {
        return (await res.json()) as NavCategory[]
      }
    } catch {
      // fallback to server fn data
    }
  }
  return await getCategories()
}

function NavigationHub() {
  const { data: categories = [] } = useQuery({
    queryKey: ['navigationData'],
    queryFn: fetchNavigationData,
    initialData: initialCategories as NavCategory[],
  })

  const [activeHash, setActiveHash] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash || ''
    }
    return ''
  })

  // Handle URL Hash change and scroll behaviors
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      setActiveHash(hash)
      if (hash) {
        const targetElement = document.getElementById(hash.substring(1))
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    // Initial scroll check on load
    if (window.location.hash) {
      setTimeout(() => {
        const targetElement = document.getElementById(window.location.hash.substring(1))
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleNavLinkClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}#${targetId}`
      window.history.pushState({ path: newUrl }, '', newUrl)
      setActiveHash(`#${targetId}`)
    }
  }

  return (
    <div>
      <header>
        <h1>WebNav Hub</h1>
      </header>
      <nav>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              <a
                href={`#${cat.id}`}
                className={activeHash === `#${cat.id}` ? 'active' : ''}
                onClick={(e) => handleNavLinkClick(e, cat.id)}
              >
                {cat.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        {categories.map((cat) => (
          <section key={cat.id} id={cat.id}>
            <h2 className="category-title">{cat.title}</h2>
            <div className="link-grid">
              {cat.links.map((link, index) => (
                <div key={index} className="link-card">
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}></a>
                  <i className={link.icon}></i>
                  <h3>{link.name}</h3>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
      <footer>
        <p>© {new Date().getFullYear()} WebNav Hub. 保留所有权利。</p>
        <nav>
          <a href="#">隐私政策</a>
          <a href="#">使用条款</a>
          <a href="#">联系我们</a>
        </nav>
      </footer>
    </div>
  )
}
