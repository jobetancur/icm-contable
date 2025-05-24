// CUSTOM ICON COMPONENT
import duotone from '@/icons/duotone'; 
//

export const navigations = [{
  type: 'label',
  label: 'Dashboard'
}, {
  name: 'Analytics',
  icon: duotone.PersonChalkboard,
  access: 'admin',
  children: [{
    name: 'Analytics Pajarito',
    path: '/dashboard'
  }, {
    name: 'Analytics Pedregal',
    path: '/dashboard/analytics-2'
  },
  {
    name: 'Analytics San Pedro',
    path: '/dashboard/analytics-3'
  },
  ]
}, {
  name: 'Financiero',
  icon: duotone.MessagesDollar,
  access: 'admin',
  children: [{
    name: 'Finance 1',
    path: '/dashboard/finance'
  }, {
    name: 'Finance 2',
    path: '/dashboard/finance-2'
  }]
}, 
// {
//   name: 'CRM',
//   icon: duotone.CommentsQuestionCheck,
//   children: [{
//     name: 'CRM',
//     path: '/dashboard/crm'
//   }, {
//     name: 'CRM 2',
//     path: '/dashboard/crm-2'
//   }]
// }, 
// {
//   name: 'Sales',
//   icon: duotone.Ecommerce,
//   children: [{
//     name: 'Sales',
//     path: '/dashboard/sales'
//   }, {
//     name: 'Sales 2',
//     path: '/dashboard/sales-2'
//   }]
// }, 
// {
//   name: 'Ecommerce',
//   path: '/dashboard/ecommerce',
//   icon: duotone.RectangleCirclePlus
// }, 
// {
//   name: 'Logistics',
//   path: '/dashboard/logistics',
//   icon: duotone.DiagramProject
// }, 
// {
//   name: 'Marketing',
//   path: '/dashboard/marketing',
//   icon: duotone.LayerGroup
// }, 
// {
//   name: 'LMS',
//   path: '/dashboard/learning-management',
//   icon: duotone.PersonCircleCheck
// }, 
// {
//   name: 'Job Management',
//   path: '/dashboard/job-management',
//   icon: duotone.PersonCircleCheck
// }, 
{
  type: 'label',
  label: 'Gestión'
}, 
{
  name: 'Perfil',
  icon: duotone.UserProfile,
  path: '/dashboard/profile'
}, 
{
  name: 'Cuenta',
  icon: duotone.Accounts,
  path: '/dashboard/account'
}, {
  name: 'Usuarios',
  icon: duotone.UserList,
  children: [{
    name: 'Crear usuario',
    path: '/dashboard/add-user'
  }, 
  // {
  //   name: 'User List 1',
  //   path: '/dashboard/user-list'
  // }, {
  //   name: 'User Grid 1',
  //   path: '/dashboard/user-grid'
  // }, 
  {
    name: 'Lista de usuarios',
    path: '/dashboard/user-list-2'
  }, 
  // {
  //   name: 'User Grid 2',
  //   path: '/dashboard/user-grid-2'
  // }
]
}, 
// {
//   name: 'Products',
//   icon: duotone.AdminEcommerce,
//   children: [{
//     name: 'Product List',
//     path: '/dashboard/product-list'
//   }, {
//     name: 'Product Grid',
//     path: '/dashboard/product-grid'
//   }, {
//     name: 'Create Product',
//     path: '/dashboard/create-product'
//   }, {
//     name: 'Product Details',
//     path: '/dashboard/product-details'
//   }]
// },  
// {
//   name: 'Ecommerce',
//   icon: duotone.Ecommerce,
//   children: [{
//     name: 'Cart',
//     path: '/dashboard/cart'
//   }, {
//     name: 'Payment',
//     path: '/dashboard/payment'
//   }, {
//     name: 'Billing Address',
//     path: '/dashboard/billing-address'
//   }, {
//     name: 'Payment Complete',
//     path: '/dashboard/payment-complete'
//   }]
// }, 
{
  name: 'Projects',
  icon: duotone.ProjectChart,
  children: [{
    name: 'Project 1',
    path: '/dashboard/projects/version-1'
  }, {
    name: 'Project 2',
    path: '/dashboard/projects/version-2'
  }, {
    name: 'Project 3',
    path: '/dashboard/projects/version-3'
  }, {
    name: 'Project Details',
    path: '/dashboard/projects/details'
  }, {
    name: 'Team Member',
    path: '/dashboard/projects/team-member'
  }]
}, {
  name: 'Registros Contables',
  icon: duotone.DataTable,
  children: [{
    name: 'Contabilidad',
    path: '/dashboard/data-table-1'
  }]
}, {
  name: 'Recibos',
  icon: duotone.Invoice,
  children: [{
    name: 'Lista de Recibos',
    path: '/dashboard/invoice-list'
  }, {
    name: 'Detalles de Recibo',
    path: '/dashboard/invoice-details'
  }, {
    name: 'Crear Recibo',
    path: '/dashboard/create-invoice'
  }]
},
// {
//   type: 'label',
//   label: 'Apps'
// }, 
// {
//   name: 'Todo List',
//   icon: duotone.TodoList,
//   path: '/dashboard/todo-list'
// }, 
// {
//   name: 'Chats',
//   icon: duotone.Chat,
//   path: '/dashboard/chat'
// }, 
// {
//   name: 'Email',
//   icon: duotone.Inbox,
//   children: [{
//     name: 'Inbox',
//     path: '/dashboard/mail/all'
//   }, {
//     name: 'Email Details',
//     path: '/dashboard/mail/details'
//   }, {
//     name: 'Create Email',
//     path: '/dashboard/mail/compose'
//   }]
// }, 
// {
//   name: 'Pages',
//   icon: duotone.Pages,
//   children: [{
//     iconText: 'E',
//     name: 'Ecommerce',
//     path: '#ecommerce',
//     children: [{
//       name: 'Shop',
//       path: '/products'
//     }, {
//       name: 'Product Details',
//       path: '/products/Wu4GdphiI0F48eMQZ_zBJ'
//     }, {
//       name: 'Cart',
//       path: '/cart'
//     }, {
//       name: 'Checkout',
//       path: '/checkout'
//     }]
//   }, {
//     iconText: 'C',
//     name: 'Career',
//     path: '#career',
//     children: [{
//       name: 'Career (Admin)',
//       path: '/dashboard/career'
//     }, {
//       name: 'Career (Public)',
//       path: '/career'
//     }, {
//       name: 'Job Details',
//       path: '/career/designer'
//     }, {
//       name: 'Job Apply',
//       path: '/career/apply'
//     }]
//   }, {
//     name: 'About (Admin)',
//     path: '/dashboard/about'
//   }, {
//     name: 'About (Public)',
//     path: '/about-us'
//   }, {
//     name: 'Contact',
//     path: '/contact-us'
//   }, {
//     name: 'Faq',
//     path: '/faqs'
//   }, {
//     name: 'Pricing',
//     path: '/pricing'
//   }, {
//     name: 'Support',
//     path: '/dashboard/support'
//   }, {
//     name: 'Create Ticket',
//     path: '/dashboard/create-ticket'
//   }, {
//     name: 'File Manager',
//     path: '/dashboard/file-manager'
//   }]
// }, 
// {
//   type: 'extLink',
//   name: 'Documentation',
//   icon: duotone.FileCircleQuestion,
//   path: 'https://uko-doc.vercel.app/'
// }, 
// {
//   type: 'label',
//   label: 'Others'
// }, 
// {
//   path: 'https://uko-doc.vercel.app/',
//   name: 'Item Disabled',
//   icon: duotone.Folder,
//   disabled: true
// }, 
// {
//   name: 'Multi Level Item',
//   icon: duotone.Apps,
//   children: [{
//     name: 'Level A',
//     path: '#dashboard/cart'
//   }, {
//     iconText: 'B',
//     name: 'Level B',
//     path: '#dashboard/payment',
//     children: [{
//       name: 'Level B1',
//       path: '#dashboard/payment'
//     }, {
//       iconText: 'B',
//       name: 'Level B2',
//       path: '#dashboard/payment',
//       children: [{
//         name: 'Level B21',
//         path: '#dashboard/payment'
//       }, {
//         name: 'Level B22',
//         path: '#dashboard/payment'
//       }]
//     }]
//   }]
// }
];