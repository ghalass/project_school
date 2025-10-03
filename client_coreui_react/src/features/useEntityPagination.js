// src/hooks/useEntityPagination.js
import { useMemo, useState } from 'react'

/**
 * Hook pour gérer recherche et pagination
 * @param {Array} data - tableau de données
 * @param {number} defaultPerPage - nombre par page
 */
const useEntityPagination = (data = [], defaultPerPage = 10) => {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [entitysPerPage, setEntitysPerPage] = useState(defaultPerPage)

  // 🔍 Filtrage
  const filteredEntitys = useMemo(() => {
    if (!data) return []
    return data.filter((el) => el.name?.toLowerCase().includes(search.toLowerCase()))
  }, [data, search])

  // 📄 Pagination
  const currentEntitys = useMemo(() => {
    const indexOfLastEntity = currentPage * entitysPerPage
    const indexOfFirstEntity = indexOfLastEntity - entitysPerPage
    return filteredEntitys.slice(indexOfFirstEntity, indexOfLastEntity)
  }, [filteredEntitys, currentPage, entitysPerPage])

  const totalPages = useMemo(
    () => Math.ceil(filteredEntitys.length / entitysPerPage),
    [filteredEntitys, entitysPerPage],
  )

  return {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    entitysPerPage,
    setEntitysPerPage,
    filteredEntitys,
    currentEntitys,
    totalPages,
  }
}

export default useEntityPagination
