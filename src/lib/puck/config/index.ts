import { Config } from "@measured/puck";
import { bookTableConfig } from "../components/book-table";
import { productDescriptionConfig } from "../components/description";
import { productInsightsConfig } from "../components/insights";
import { productObjectivesConfig } from "../components/objectives";
import { studentSuccessConfig } from "../components/carousel";

export const puckConfig: Config = {
  components: {
    ProductDetails: bookTableConfig,
    ProductDescritpion: productDescriptionConfig,
    ProductStatistics: productInsightsConfig,
    ProductObjectives: productObjectivesConfig,
    ProductStudentSuccess: studentSuccessConfig,
  },
};
