import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div class="flex flex-col md:flex-row justify-between items-center mb-12">
        <h1 class="text-3xl font-serif font-bold text-luxury-black">Tableau de Bord Admin</h1>
        <div class="mt-4 md:mt-0">
          <span class="text-gray-500">Bienvenue, {{ (authService.currentUser$ | async)?.username }}</span>
        </div>
      </div>

      <!-- quickStats cards could go here -->

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Manage Watches -->
        <a routerLink="/admin/watches" class="group block p-8 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-luxury-gold transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-luxury-black group-hover:text-luxury-gold transition-colors">Gérer les Montres</h3>
            <svg class="w-8 h-8 text-gray-300 group-hover:text-luxury-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <p class="text-gray-500 mb-6">Ajouter, modifier ou supprimer des montres du catalogue. Gérer les stocks et les prix.</p>
          <span class="text-sm font-bold uppercase tracking-widest text-luxury-black group-hover:text-luxury-gold flex items-center">
            Accéder
            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </a>

        <!-- Manage Orders -->
        <a routerLink="/admin/orders" class="group block p-8 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-luxury-gold transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-luxury-black group-hover:text-luxury-gold transition-colors">Gérer les Commandes</h3>
            <svg class="w-8 h-8 text-gray-300 group-hover:text-luxury-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
          </div>
          <p class="text-gray-500 mb-6">Voir les commandes clients, mettre à jour les statuts et suivre les expéditions.</p>
          <span class="text-sm font-bold uppercase tracking-widest text-luxury-black group-hover:text-luxury-gold flex items-center">
            Accéder
            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </a>

        <!-- Add Watch Shortcut -->
        <a routerLink="/admin/watches/add" class="group block p-8 bg-luxury-black border border-luxury-black shadow-sm hover:bg-gray-900 transition-all duration-300">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-white group-hover:text-luxury-gold transition-colors">Ajouter une Montre</h3>
            <svg class="w-8 h-8 text-gray-500 group-hover:text-luxury-gold transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"></path></svg>
          </div>
          <p class="text-gray-400 mb-6">Ajout rapide d'un nouveau produit au catalogue.</p>
          <span class="text-sm font-bold uppercase tracking-widest text-white group-hover:text-luxury-gold flex items-center">
            Créer
            <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </a>

      </div>
    </div>
  `,
  styles: []
})
export class AdminDashboardComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
