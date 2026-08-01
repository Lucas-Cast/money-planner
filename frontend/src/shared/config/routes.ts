export const routes = {
  goals: {
    create: '/goals',
    list: '/goals',
    getById: (id: number) => `/goals/${id}`,
    update: (id: number) => `/goals/${id}`,
    delete: (id: number) => `/goals/${id}`,
  },
  allocations: {
    create: '/allocations',
    list: '/allocations',
    listByGoal: (goalId: number) => `/allocations?goalId=${goalId}`,
    getById: (id: number) => `/allocations/${id}`,
    update: (id: number) => `/allocations/${id}`,
    delete: (id: number) => `/allocations/${id}`,
  },
} as const
