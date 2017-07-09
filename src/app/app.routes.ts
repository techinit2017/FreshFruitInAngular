import { FruitHomeComponent } from './fruit-home/fruit-home.component';
import { Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
export const AppRoutes:Routes = [ 
    {
        path : 'fruit-home',
        component : FruitHomeComponent
    },
     
    
    
]