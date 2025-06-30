// import React, { type JSX } from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
//   children,
// }) => {
//   const authed = useAuth();
//   const [isOpen, setIsOpen] = React.useState(false);
//   const SIDEBAR_WIDTH = '70%';

//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);

//   if (!authed) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="flex flex-col h-screen text-base">
//       {/* Navbar */}
//       <Navbar onOpenDrawer={handleOpen} />

//       {/* Body Layout */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar (hidden on small screens) */}
//         <div className="hidden md:block">
//           <Sidebar
//             onCloseDrawer={handleClose}
//             isMobileSidebar={false}
//             sidebarWidth="250px"
//           />
//         </div>

//         {/* Mobile Sidebar (shown when open)
//         <MobileSidebar
//           isOpenDrawer={isOpen}
//           onCloseDrawer={handleClose}
//           isMobileSidebar={true}
//           sidebarWidth={SIDEBAR_WIDTH}
//         /> */}

//         {/* Main Content */}
//         <div className="flex-1 px-3 sm:px-4 lg:px-5 py-3 bg-gray-100 overflow-y-auto">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProtectedRoute;
