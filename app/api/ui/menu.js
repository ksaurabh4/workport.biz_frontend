module.exports = (() => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user?.userRole);
  return ([
    {
      key: 'dashboard',
      name: 'Dashboard',
      linkParent: '/app',
      icon: 'ion-ios-home-outline',
    },
    {
      key: 'companies',
      name: 'Companies',
      linkParent: '/app/companies',
      icon: 'ion-ios-cube-outline',
    },
    {
      key: 'employees',
      name: 'Employees',
      linkParent: '/app/employees',
      icon: 'ion-ios-person-outline',
    },
    {
      key: 'goals',
      name: 'goals',
      linkParent: '/app/goals',
      icon: 'ion-ios-pie-outline',
    },
    // {
    //   key: 'goals',
    //   name: 'goals',
    //   icon: 'ion-ios-pie-outline',
    //   child: [
    //     {
    //       key: 'g1',
    //       name: 'G1',
    //       link: '/app/goals/g1',
    //     },
    //     {
    //       key: 'g2',
    //       name: 'G2',
    //       link: '/app/goals/g2',
    //     },
    //     {
    //       key: 'g3',
    //       name: 'G3',
    //       link: '/app/employees/g3',
    //     },
    //     {
    //       key: 'summary',
    //       name: 'Summary',
    //       link: '/app/employees/summary',
    //     },
    //   ]
    // },
    {
      key: 'todos',
      name: 'Tasks',
      linkParent: '/app/tasks',
      icon: 'ion-ios-list-box-outline',
    },
    {
      key: 'announcements',
      name: 'Announcements',
      linkParent: '/app/announcements',
      icon: 'ion-ios-globe-outline',
    },
  // child: [
  //   // {
  //   //   key: 'landing_page',
  //   //   name: 'Landing Page',
  //   //   title: true,
  //   // },
  //   // {
  //   //   key: 'corporate',
  //   //   name: 'Corporate',
  //   //   link: '/',
  //   //   badge: 'Hot',
  //   //   icon: 'ion-ios-globe-outline'
  //   // },
  //   // {
  //   //   key: 'creative',
  //   //   name: 'Creative',
  //   //   link: '/landing-creative',
  //   //   icon: 'ion-ios-desktop-outline'
  //   // },
  //   // {
  //   //   key: 'dashboard',
  //   //   name: 'Dashboard',
  //   //   title: true,
  //   // },
  //   {
  //     key: 'personal',
  //     name: 'Personal',
  //     link: '/app',
  //     icon: 'ion-ios-contact-outline'
  //   },
  //   // {
  //   //   key: 'crm',
  //   //   name: 'Sales Marketing',
  //   //   link: '/app/dashboard/sales-marketing',
  //   //   icon: 'ion-ios-card-outline'
  //   // },
  //   // {
  //   //   key: 'crypto',
  //   //   name: 'Cryptocurrency',
  //   //   link: '/app/dashboard/cryptocurrency',
  //   //   icon: 'ion-ios-medal-outline'
  //   // },
  //   {
  //     key: 'dashboard_widgets',
  //     name: 'Dashboard Widgets',
  //     title: true,
  //   },
  //   {
  //     key: 'infographics_wdiget',
  //     name: 'Infographics',
  //     link: '/app/widgets/infographics',
  //     icon: 'ion-ios-card'
  //   },
  //   {
  //     key: 'status_widget',
  //     name: 'Status',
  //     link: '/app/widgets/status',
  //     icon: 'ion-ios-notifications-outline'
  //   },
  //   {
  //     key: 'mini_apps_widget',
  //     name: 'Mini Apps',
  //     link: '/app/widgets/mini-apps',
  //     icon: 'ion-ios-information-circle-outline'
  //   },
  //   {
  //     key: 'analytics_widget',
  //     name: 'Analytics',
  //     link: '/app/widgets/analytics',
  //     icon: 'ion-ios-analytics-outline'
  //   },
  //   {
  //     key: 'info_updates_widget',
  //     name: 'Info & Updates',
  //     link: '/app/widgets/info-updates',
  //     icon: 'ion-ios-information-circle-outline'
  //   },
  //   {
  //     key: 'layout_settings',
  //     name: 'Layout',
  //     title: true,
  //   },
  //   {
  //     key: 'grid',
  //     name: 'Grid',
  //     link: '/app/layouts/grid',
  //     icon: 'ion-ios-apps-outline'
  //   },
  //   {
  //     key: 'application_layout',
  //     name: 'App Layout',
  //     link: '/app/layouts/app-layout',
  //     icon: 'ion-ios-photos-outline'
  //   },
  //   {
  //     key: 'responsive',
  //     name: 'Responsive',
  //     link: '/app/layouts/responsive',
  //     icon: 'ion-ios-phone-portrait'
  //   }
  // ]
  // },
  // {
  //   key: 'apps',
  //   name: 'Applications',
  //   icon: 'ion-ios-appstore-outline',
  //   child: [
  //     {
  //       key: 'communication_apps',
  //       name: 'Communication',
  //       title: true,
  //     },
  //     {
  //       key: 'contact',
  //       name: 'Contact',
  //       link: '/app/pages/contact',
  //       icon: 'ion-ios-contact-outline'
  //     },
  //     {
  //       key: 'email',
  //       name: 'Email',
  //       link: '/app/pages/email',
  //       badge: '2',
  //       icon: 'ion-ios-mail-outline'
  //     },
  //     {
  //       key: 'social_apps',
  //       name: 'Social',
  //       title: true,
  //     },
  //     {
  //       key: 'timeline',
  //       name: 'Timeline',
  //       link: '/app/pages/timeline',
  //       icon: 'ion-ios-people-outline'
  //     },
  //     {
  //       key: 'chat',
  //       name: 'Chat',
  //       link: '/app/pages/chat',
  //       badge: '4',
  //       icon: 'ion-ios-chatbubbles-outline'
  //     },
  //     {
  //       key: 'ecommerce_app',
  //       name: 'Ecommerce',
  //       title: true,
  //     },
  //     {
  //       key: 'Itemlist',
  //       name: 'Product Catalogues',
  //       link: '/app/pages/ecommerce',
  //       icon: 'ion-ios-apps-outline'
  //     },
  //     {
  //       key: 'item_detail',
  //       name: 'Product Detail',
  //       link: '/app/pages/product-detail',
  //       icon: 'ion-ios-card'
  //     },
  //     {
  //       key: 'checkout',
  //       name: 'Checkout Page',
  //       link: '/app/pages/checkout',
  //       icon: 'ion-ios-cart-outline'
  //     },
  //     {
  //       key: 'dynamic_invoice',
  //       name: 'Dynamic Invoice',
  //       link: '/app/pages/invoice',
  //       icon: 'ion-ios-document-outline'
  //     },
  //     {
  //       key: 'productivity_app',
  //       name: 'Productivity',
  //       title: true,
  //     },
  //     {
  //       key: 'calendar',
  //       name: 'Calendar',
  //       link: '/app/pages/calendar',
  //       icon: 'ion-ios-calendar-outline'
  //     },
  //     {
  //       key: 'task',
  //       name: 'Task Board',
  //       link: '/app/pages/taskboard',
  //       icon: 'ion-ios-checkmark-circle-outline'
  //     },
  //   ]
  // },
  // {
  //   key: 'pages',
  //   name: 'Pages',
  //   icon: 'ion-ios-paper-outline',
  //   child: [
  //     {
  //       key: 'account_page',
  //       name: 'Auth Page',
  //       title: true,
  //     },
  //     {
  //       key: 'login',
  //       name: 'Login',
  //       link: '/login',
  //       icon: 'ion-ios-person-outline'
  //     },
  //     {
  //       key: 'login2',
  //       name: 'Login Ver.2',
  //       link: '/login-v2',
  //       icon: 'ion-ios-contact-outline'
  //     },
  //     {
  //       key: 'login3',
  //       name: 'Login Ver.3',
  //       link: '/login-v3',
  //       icon: 'ion-ios-contact-outline'
  //     },
  //     {
  //       key: 'register',
  //       name: 'Register',
  //       link: '/register',
  //       icon: 'ion-ios-key-outline'
  //     },
  //     {
  //       key: 'register2',
  //       name: 'Register Ver.2',
  //       link: '/register-v2',
  //       icon: 'ion-ios-key-outline'
  //     },
  //     {
  //       key: 'register3',
  //       name: 'Register Ver.3',
  //       link: '/register-v3',
  //       icon: 'ion-ios-key-outline'
  //     },
  //     {
  //       key: 'reset',
  //       name: 'Reset Password',
  //       link: '/reset-password',
  //       icon: 'ion-ios-undo-outline'
  //     },
  //     {
  //       key: 'lock',
  //       name: 'Lock Screen',
  //       link: '/lock-screen',
  //       icon: 'ion-ios-lock-outline'
  //     },
  //     {
  //       key: 'generic_page',
  //       name: 'General',
  //       title: true,
  //     },
  //     {
  //       key: 'user_profile',
  //       name: 'User Profile',
  //       link: '/app/pages/user-profile',
  //       icon: 'ion-ios-person-outline'
  //     },
  //     {
  //       key: 'blank',
  //       name: 'Blank Page',
  //       link: '/app/pages/blank-page',
  //       icon: 'ion-ios-document-outline'
  //     },
  //     {
  //       key: 'pricing',
  //       name: 'Pricing Page',
  //       link: '/app/pages/pricing',
  //       icon: 'ion-ios-archive-outline'
  //     },
  //     {
  //       key: 'gallery',
  //       name: 'Photo Gallery',
  //       link: '/app/pages/photo-gallery',
  //       icon: 'ion-ios-images-outline'
  //     },
  //     {
  //       key: 'settings',
  //       name: 'Settings',
  //       link: '/app/pages/settings',
  //       icon: 'ion-ios-options-outline'
  //     },
  //     {
  //       key: 'help_support',
  //       name: 'Help & Support',
  //       link: '/app/pages/help-support',
  //       icon: 'ion-ios-help-circle-outline'
  //     },
  //     {
  //       key: 'maintenance',
  //       name: 'Maintenance',
  //       link: '/maintenance',
  //       icon: 'ion-ios-build-outline'
  //     },
  //     {
  //       key: 'coming_soon',
  //       name: 'Coming Soon',
  //       link: '/coming-soon',
  //       icon: 'ion-ios-bonfire-outline'
  //     },
  //     {
  //       key: 'blog',
  //       name: 'Blog',
  //       title: true,
  //     },
  //     {
  //       key: 'blog_list',
  //       name: 'Blog Home',
  //       link: '/blog',
  //       icon: 'ion-ios-home-outline'
  //     },
  //     {
  //       key: 'blog_detail',
  //       name: 'Article',
  //       link: '/blog/article',
  //       icon: 'ion-ios-list-box-outline'
  //     },
  //     {
  //       key: 'errors',
  //       name: 'Errors',
  //       title: true,
  //     },
  //     {
  //       key: 'not_found_page',
  //       name: 'Not Found Page',
  //       link: '/app/pages/not-found',
  //       icon: 'ion-ios-warning-outline'
  //     },
  //     {
  //       key: 'error_page',
  //       name: 'Error Page',
  //       link: '/app/pages/error',
  //       icon: 'ion-ios-warning-outline'
  //     },
  //   ]
  // },
  // {
  //   key: 'tables',
  //   name: 'Tables',
  //   icon: 'ion-ios-grid-outline',
  //   child: [
  //     {
  //       key: 'common_table',
  //       name: 'Common Table',
  //       title: true,
  //     },
  //     {
  //       key: 'basic_table',
  //       name: 'Basic',
  //       link: '/app/tables/basic-table',
  //       icon: 'ion-ios-grid-outline'
  //     },
  //     {
  //       key: 'data_table',
  //       name: 'Data Tables',
  //       link: '/app/tables/data-table',
  //       icon: 'ion-ios-cube-outline'
  //     },
  //     {
  //       key: 'table_playground',
  //       name: 'Table Playgound',
  //       link: '/app/tables/table-playground',
  //       icon: 'ion-ios-list-box-outline'
  //     },
  //     {
  //       key: 'redux_table',
  //       name: 'Redux Table',
  //       title: true,
  //     },
  //     {
  //       key: 'editable_cell',
  //       name: 'Table Edit',
  //       link: '/app/tables/editable-cell',
  //       icon: 'ion-ios-cube-outline'
  //     },
  //     {
  //       key: 'tree_table',
  //       name: 'Tree Table',
  //       link: '/app/tables/tree-table',
  //       icon: 'ion-ios-git-merge'
  //     },
  //   ]
  // },
  // {
  //   key: 'forms',
  //   name: 'Forms Buttons',
  //   icon: 'ion-ios-list-box-outline',
  //   child: [
  //     {
  //       key: 'buttons_collections',
  //       name: 'Button Collections',
  //       title: true,
  //     },
  //     {
  //       key: 'buttons',
  //       name: 'Buttons',
  //       link: '/app/forms/buttons',
  //       icon: 'ion-ios-game-controller-a-outline'
  //     },
  //     {
  //       key: 'toggle_button',
  //       name: 'Toggle Button',
  //       link: '/app/forms/toggle-button',
  //       icon: 'ion-ios-switch-outline'
  //     },
  //     {
  //       key: 'dial_button',
  //       name: 'Dial Button',
  //       link: '/app/forms/dial-button',
  //       icon: 'ion-ios-add-circle-outline'
  //     },
  //     {
  //       key: 'text_input',
  //       name: 'Text Input',
  //       title: true,
  //     },
  //     {
  //       key: 'textfields',
  //       name: 'Textfields',
  //       link: '/app/forms/textfields',
  //       icon: 'ion-ios-list-box-outline'
  //     },
  //     {
  //       key: 'autocomplete',
  //       name: 'Autocomplete & Tag',
  //       link: '/app/forms/autocomplete',
  //       icon: 'ion-ios-list'
  //     },
  //     {
  //       key: 'datetimepicker',
  //       name: 'Date Time Picker',
  //       link: '/app/forms/date-time-picker',
  //       icon: 'ion-ios-calendar-outline'
  //     },
  //     {
  //       key: 'reduxform',
  //       name: 'Redux Form',
  //       link: '/app/forms/reduxform',
  //       icon: 'ion-ios-list-box-outline'
  //     },
  //     {
  //       key: 'selection',
  //       name: 'Selection',
  //       title: true,
  //     },
  //     {
  //       key: 'checkbox_radio',
  //       name: 'Checkbox & Radio',
  //       link: '/app/forms/checkbox-radio',
  //       icon: 'ion-ios-checkbox-outline'
  //     },
  //     {
  //       key: 'switches',
  //       name: 'Switches',
  //       link: '/app/forms/switches',
  //       icon: 'ion-ios-switch-outline'
  //     },
  //     {
  //       key: 'selectbox',
  //       name: 'Select',
  //       link: '/app/forms/selectbox',
  //       icon: 'ion-ios-menu-outline'
  //     },
  //     {
  //       key: 'advanced_input',
  //       name: 'Advanced Input',
  //       title: true,
  //     },
  //     {
  //       key: 'slider',
  //       name: 'Slider Range',
  //       link: '/app/forms/slider-range',
  //       icon: 'ion-ios-options-outline'
  //     },
  //     {
  //       key: 'upload',
  //       name: 'Upload',
  //       link: '/app/forms/upload',
  //       icon: 'ion-ios-cloud-upload-outline'
  //     },
  //     {
  //       key: 'ratting',
  //       name: 'Ratting',
  //       link: '/app/forms/ratting',
  //       icon: 'ion-ios-star-half'
  //     },
  //     {
  //       key: 'texteditor',
  //       name: 'WYSIWYG Editor',
  //       link: '/app/forms/wysiwyg-editor',
  //       icon: 'ion-ios-create-outline'
  //     },
  //   ]
  // },
  // {
  //   key: 'ui',
  //   name: 'UI Collection',
  //   icon: 'ion-ios-flower-outline',
  //   child: [
  //     {
  //       key: 'material_content',
  //       name: 'Block Container',
  //       title: true,
  //     },
  //     {
  //       key: 'card_papper',
  //       name: 'Card & Papper',
  //       link: '/app/ui/card-papper',
  //       icon: 'ion-ios-card-outline'
  //     },
  //     {
  //       key: 'accordion',
  //       name: 'Accordion',
  //       link: '/app/ui/accordion',
  //       icon: 'ion-ios-menu-outline'
  //     },
  //     {
  //       key: 'material_navigation',
  //       name: 'Navigation',
  //       title: true,
  //     },
  //     {
  //       key: 'tab',
  //       name: 'Tabs Navigation',
  //       link: '/app/ui/tabs',
  //       icon: 'ion-ios-folder-outline'
  //     },
  //     {
  //       key: 'drawer_menu',
  //       name: 'Menu & Drawer',
  //       link: '/app/ui/drawer-menu',
  //       icon: 'ion-ios-settings-outline'
  //     },
  //     {
  //       key: 'breadcrumbs',
  //       name: 'Breadcrumbs',
  //       link: '/app/ui/breadcrumbs',
  //       icon: 'ion-ios-arrow-dropright'
  //     },
  //     {
  //       key: 'paginations',
  //       name: 'Paginations',
  //       link: '/app/ui/paginations',
  //       icon: 'ion-ios-arrow-round-forward'
  //     },
  //     {
  //       key: 'steppers',
  //       name: 'Steppers',
  //       link: '/app/ui/steppers',
  //       icon: 'ion-ios-glasses-outline'
  //     },
  //     {
  //       key: 'material_popup',
  //       name: 'Popup',
  //       title: true,
  //     },
  //     {
  //       key: 'dialog_modal',
  //       name: 'Dialog & Modal',
  //       link: '/app/ui/dialog-modal',
  //       icon: 'ion-ios-glasses-outline'
  //     },
  //     {
  //       key: 'popover_tooltip',
  //       name: 'Popover & Tooltip',
  //       link: '/app/ui/popover-tooltip',
  //       icon: 'ion-ios-photos-outline'
  //     },
  //     {
  //       key: 'material_notif',
  //       name: 'Notification',
  //       title: true,
  //       icon: 'ion-ios-information-circle-outline'
  //     },
  //     {
  //       key: 'badges',
  //       name: 'Badges',
  //       link: '/app/ui/badges',
  //       icon: 'ion-ios-bookmark-outline'
  //     },
  //     {
  //       key: 'snackbar',
  //       name: 'Messages',
  //       link: '/app/ui/snackbar',
  //       icon: 'ion-ios-notifications-outline'
  //     },
  //     {
  //       key: 'material_dividers',
  //       name: 'Dividers',
  //       title: true,
  //     },
  //     {
  //       key: 'list_divider',
  //       name: 'List & Divider',
  //       link: '/app/ui/list',
  //       icon: 'ion-ios-menu'
  //     },
  //     {
  //       key: 'custom_dividers',
  //       name: 'Custom Dividers',
  //       link: '/app/ui/dividers',
  //       icon: 'ion-ios-menu-outline'
  //     },
  //     {
  //       key: 'material_image',
  //       name: 'Images',
  //       title: true,
  //     },
  //     {
  //       key: 'avatars',
  //       name: 'Avatars',
  //       link: '/app/ui/avatars',
  //       icon: 'ion-ios-contact-outline'
  //     },
  //     {
  //       key: 'image_gird',
  //       name: 'Image Grid Gallery',
  //       link: '/app/ui/image-grid',
  //       icon: 'ion-ios-apps-outline'
  //     },
  //     {
  //       key: 'slider_carousel',
  //       name: 'Slider & Carousel',
  //       link: '/app/ui/slider-carousel',
  //       icon: 'ion-ios-images-outline'
  //     },
  //     {
  //       key: 'material_font_icon',
  //       name: 'Fonts & Icons',
  //       title: true,
  //     },
  //     {
  //       key: 'typography',
  //       name: 'Typography',
  //       link: '/app/ui/typography',
  //       icon: 'ion-ios-create-outline'
  //     },
  //     {
  //       key: 'icons',
  //       name: 'Material Icons',
  //       link: '/app/ui/icons',
  //       icon: 'ion-ios-heart-outline'
  //     },
  //     {
  //       key: 'ionicons',
  //       name: 'Ion Icons',
  //       link: '/app/ui/ionicons',
  //       icon: 'ion-ios-ionic-outline'
  //     },
  //     {
  //       key: 'utilities',
  //       name: 'Utility',
  //       title: true,
  //     },
  //     {
  //       key: 'progress',
  //       name: 'Progress & Spinners',
  //       link: '/app/ui/progress',
  //       icon: 'ion-ios-glasses-outline'
  //     },
  //     {
  //       key: 'tags',
  //       name: 'Tags',
  //       link: '/app/ui/tags',
  //       icon: 'ion-ios-pricetag-outline'
  //     },
  //   ]
  // },
  // {
  //   key: 'charts',
  //   name: 'Charts',
  //   icon: 'ion-ios-pie-outline',
  //   child: [
  //     {
  //       key: 'svg_chart',
  //       name: 'SVG Chart',
  //       title: true,
  //     },
  //     {
  //       key: 'line_charts',
  //       name: 'Line',
  //       link: '/app/charts/line-charts',
  //       icon: 'ion-ios-pulse-outline'
  //     },
  //     {
  //       key: 'bar_charts',
  //       name: 'Bar',
  //       link: '/app/charts/bar-charts',
  //       icon: 'ion-ios-stats-outline'
  //     },
  //     {
  //       key: 'area_charts',
  //       name: 'Area',
  //       link: '/app/charts/area-charts',
  //       icon: 'ion-ios-analytics-outline'
  //     },
  //     {
  //       key: 'pie_charts',
  //       name: 'Pie & Doughnut',
  //       link: '/app/charts/pie-charts',
  //       icon: 'ion-ios-pie-outline'
  //     },
  //     {
  //       key: 'radar_charts',
  //       name: 'Radar',
  //       link: '/app/charts/radar-charts',
  //       icon: 'ion-ios-ionic-outline'
  //     },
  //     {
  //       key: 'scatter_charts',
  //       name: 'Scatter',
  //       link: '/app/charts/scatter-charts',
  //       icon: 'ion-ios-sunny-outline'
  //     },
  //     {
  //       key: 'compossed_charts',
  //       name: 'Compossed',
  //       link: '/app/charts/compossed-chart',
  //       icon: 'ion-ios-stats-outline'
  //     },
  //     {
  //       key: 'canvas_chart',
  //       name: 'Canvas Chart',
  //       title: true,
  //     },
  //     {
  //       key: 'doughnut_pie',
  //       name: 'Doughnut & Pie',
  //       link: '/app/charts/doughnut-pie-charts',
  //       icon: 'ion-ios-pie-outline'
  //     },
  //     {
  //       key: 'bar_canvas_chart',
  //       name: 'Bar Direction',
  //       link: '/app/charts/bar-direction-charts',
  //       icon: 'ion-ios-stats-outline'
  //     },
  //     {
  //       key: 'line_canvas_chart',
  //       name: 'Line and Scatter',
  //       link: '/app/charts/line-scatter-charts',
  //       icon: 'ion-ios-sunny-outline'
  //     },
  //     {
  //       key: 'area_canvas_chart',
  //       name: 'Area Filled',
  //       link: '/app/charts/area-filled-charts',
  //       icon: 'ion-ios-analytics-outline'
  //     },
  //     {
  //       key: 'radar_canvas_chart',
  //       name: 'Radar and Polar',
  //       link: '/app/charts/radar-polar-chart',
  //       icon: 'ion-ios-ionic-outline'
  //     },
  //   ]
  // },
  // {
  //   key: 'maps',
  //   name: 'Maps',
  //   icon: 'ion-ios-navigate-outline',
  //   child: [
  //     {
  //       key: 'google_map',
  //       name: 'Google Map',
  //       title: true,
  //     },
  //     {
  //       key: 'map_marker',
  //       name: 'Map Marker',
  //       link: '/app/maps/map-marker',
  //       icon: 'ion-ios-pin-outline'
  //     },
  //     {
  //       key: 'map_direction',
  //       name: 'Map Direction',
  //       link: '/app/maps/map-direction',
  //       icon: 'ion-ios-arrow-dropright'
  //     },
  //     {
  //       key: 'map_searchbox',
  //       name: 'Map with Searchbox',
  //       link: '/app/maps/map-searchbox',
  //       icon: 'ion-ios-search-outline'
  //     },
  //     {
  //       key: 'map_traffic',
  //       name: 'Traffic Indicator',
  //       link: '/app/maps/map-traffic',
  //       icon: 'ion-ios-car-outline'
  //     },
  //     {
  //       key: 'street_view',
  //       name: 'Street View',
  //       link: '/app/maps/street-view',
  //       icon: 'ion-ios-eye-outline'
  //     },
  //   ]
  // },
  // {
  //   key: 'menu_levels',
  //   name: 'Menu Levels',
  //   multilevel: true,
  //   icon: 'ion-ios-menu-outline',
  //   child: [
  //     {
  //       key: 'level_1',
  //       name: 'Level 1',
  //       link: '/#'
  //     },
  //     {
  //       key: 'level_2',
  //       keyParent: 'menu_levels',
  //       name: 'Level 2',
  //       child: [
  //         {
  //           key: 'sub_menu_1',
  //           name: 'Sub Menu 1',
  //           link: '/#'
  //         },
  //         {
  //           key: 'sub_menu_2',
  //           name: 'Sub Menu 2',
  //           link: '/#'
  //         },
  //       ]
  //     },
  //   ]
  // },
  // {
  //   key: 'blank_single',
  //   name: 'Blank Page',
  //   icon: 'ion-ios-document-outline',
  //   linkParent: '/app/blank-single',
  // }
  ]);
})();
