import { Component, Input } from '@angular/core';
import { Album } from '../album';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-album-details',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.css'
})
export class AlbumDetailsComponent {
  @Input() album?: Album;
}
