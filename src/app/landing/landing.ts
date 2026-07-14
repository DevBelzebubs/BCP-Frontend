import { Component } from '@angular/core';
import { Header } from "./header/header";
import { Carousel } from "./carousel/carousel";
import { Actions } from "./actions/actions";
import { Promotions } from "./promotions/promotions";
import { Education } from "./education/education";
import { Footer } from "./footer/footer";
@Component({
  selector: 'app-landing',
  imports: [Header, Carousel, Actions, Promotions, Education, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

}
