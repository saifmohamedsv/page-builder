import { Config } from "@measured/puck";
import { bookTableConfig } from "../components/book-table";
import { productDescriptionConfig } from "../components/description";
import { productInsightsConfig } from "../components/insights";
import { productObjectivesConfig } from "../components/objectives";
import { studentSuccessConfig } from "../components/carousel";
import { productCarouselConfig } from "../components/product-carousel";
import { productVideoConfig } from "../components/product-video-intro";
import { reviewsListConfig } from "../components/reviews";

export const puckConfig: Config = {
  components: {
    ProductCarousel: productCarouselConfig,
    ProductVideo: productVideoConfig,
    ProductDetails: bookTableConfig,
    ProductDescritpion: productDescriptionConfig,
    ProductStatistics: productInsightsConfig,
    ProductObjectives: productObjectivesConfig,
    ProductStudentSuccess: studentSuccessConfig,
    CustomerReviews: reviewsListConfig,
  },
};
