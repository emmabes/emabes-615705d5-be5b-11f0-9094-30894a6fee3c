import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col md:flex-row h-screen bg-gray-100">
      <!-- Desktop Sidebar -->
      <aside class="hidden md:flex md:flex-col md:w-40 bg-white shadow-md">
        <div class="p-4">
          <h1 class="text-xl font-bold text-gray-800">Task Manager</h1>
        </div>
        <nav class="flex-1 mt-6">
          <a href="#" class="flex items-center px-4 py-3 text-gray-700 bg-gray-100 border-r-4 border-blue-500">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            <span class="text-sm">Dashboard</span>
          </a>
          <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2m-2 0v4l3-3m-3 3l-3-3"></path>
            </svg>
            <span class="text-sm">Tasks</span>
          </a>
          <a href="#" class="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-sm">Settings</span>
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Mobile Header -->
        <header class="md:hidden bg-white shadow-sm border-b">
          <div class="px-4 py-3">
            <h1 class="text-lg font-bold text-gray-800">Task Manager</h1>
          </div>
        </header>

        <!-- Desktop Header -->
        <header class="hidden md:block bg-white shadow-sm border-b">
          <div class="px-6 py-4">
            <h2 class="text-2xl font-semibold text-gray-800">Dashboard</h2>
          </div>
        </header>
        
        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-4">
          <ng-content></ng-content>
        </div>
      </main>

      <!-- Mobile Bottom Navigation -->
      <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div class="flex justify-around py-2">
          <a href="#" class="flex flex-col items-center py-2 px-3 text-blue-600">
            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            <span class="text-xs">Dashboard</span>
          </a>
          <a href="#" class="flex flex-col items-center py-2 px-3 text-gray-600">
            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2m-2 0v4l3-3m-3 3l-3-3"></path>
            </svg>
            <span class="text-xs">Tasks</span>
          </a>
          <a href="#" class="flex flex-col items-center py-2 px-3 text-gray-600">
            <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-xs">Settings</span>
          </a>
        </div>
      </nav>
    </div>
  `
})
export class DashboardLayoutComponent {}
