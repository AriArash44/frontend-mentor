import omeletteImage from '../../public/assets/images/image-omelette.jpeg';

export const recipes = [
    {
        name: "omelette",
        image: omeletteImage,
        title: "Simple Omelette Recipe",
        intro: "An easy and quick dish, peerfect for any meal. This classic omelette combines beaten eggs cooked to perfection,\
        optionally filled with your choice of cheese, vegtables, or meats.",
        preparation_time: {
            total: "Approximately 10 minutes",
            preparation: "5 minutes",
            cooking: "5 minutes" 
        },
        ingredients: ["2-3 large eggs", "Salt, to taste", "Pepper, to taste", "1 tablespoon of butter or oil", 
            "OPtional fillings: cheese, dices vegtables, cooked meats, herbs"],
        instructions: {
            beat_the_eggs: "In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed.\
            You can add a tablespoon of water or milk for a fluffier texture.",
            heat_the_pan: "Place a non-stick frying pan over medium heat and add butter or oil.",
            cook_the_omelette: "Once the butter is melted and bubbling, pour in the eggs.\
            Tilt the pan to ensure the eggs evenly coat the surface.",
            "add_fillings_(optional)": "When the eggs begin to set at the edges but are still slightly runny in the middle,\
            sprinkle your chosen fillings over one half of the omelette.",
            fold_and_serve: "As the omelette continues to cook, carefully lift one edge and fold it over the fillings.\
            Let it cook for another minute, then slide it onto a plate.",
            enjoy: "Serve hot, with additional salt and pepper if needed."
        },
        nutrition: {
            title: "The table below shows nutritional values per serving without the additional fillings.",
            data: {
                callories: "277kcal",
                carbs: "0g",
                protein: "20g",
                fat: "22g"
            }
        }
    }
];