import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  aboutData = {
    title: 'About PieKart',
    subtitle: 'Your Premier Destination for Online Shopping',
    description: `
      At PieKart, we believe in making online shopping an unforgettable experience for our customers. With an extensive range of products, seamless browsing, and secure transactions, PieKart is your go-to destination for all your shopping needs.

      Our mission at PieKart is simple: to provide our customers with a hassle-free shopping experience. Whether you're looking for electronics, fashion, home goods, or more, we strive to offer a wide range of products to cater to every need and preference.

      Join the millions of satisfied customers who trust PieKart for their online shopping needs. Experience the convenience, quality, and reliability that have made us a leader in the e-commerce industry.

      Here are some key features of PieKart:
      - Diverse Product Selection: From electronics to fashion, we have something for everyone.
      - Quality Assurance: We partner with top brands to ensure the highest quality products.
      - Secure Transactions: Your privacy and security are our top priorities.
      - Fast Shipping: We offer quick and reliable shipping options to get your orders to you as soon as possible.
      - Exceptional Customer Service: Our dedicated support team is here to assist you with any questions or concerns.

      Additionally, we are committed to sustainability and ethical business practices. We source our products responsibly and strive to minimize our environmental impact.

      PieKart is more than just a shopping platform; it's a community of like-minded individuals who value convenience, quality, and integrity. Join us today and discover the PieKart difference!
    `
  };
}

