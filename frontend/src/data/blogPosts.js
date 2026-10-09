import jaggeryBowl from '../assets/jaggery hero new.jpeg';
import jaggeryCloseUp from '../assets/jaggery hero.jpg';
import jaggeryPouch from '../assets/jaggery new 6.jpeg';
import jaggeryProcess from '../assets/jaggery new 5.jpeg';

// Blog content lives here as plain data, so adding a post is just adding an
// object to this array (newest first). No backend involved.
//
// Fields:
//  - slug        URL part: /blog/<slug>
//  - category    one of BLOG_CATEGORIES
//  - image       optional cover photo. Without one, the post gets an
//                illustrated cover built from `cover` (gradient + icon name).
//  - recipe      optional; turns the post into a recipe with a recipe card.
//  - body        array of blocks: { type: 'p' | 'h2' | 'list' | 'tip' | 'image', ... }
//  - shopCategory  optional Shop category for the "shop the ingredient" link.

export const BLOG_CATEGORIES = ['Recipes', 'Health & Nutrition', 'Kitchen Guide', 'Behind the Scenes'];

export const BLOG_AUTHOR = 'Mahaveer Food Team';

export const blogPosts = [
    {
        slug: 'jaggery-vs-refined-sugar',
        title: 'Jaggery vs Refined Sugar: What Is the Real Difference?',
        excerpt:
            'Both are sweeteners made from sugarcane, so what actually changes between the brown block in your kitchen and white table sugar? An honest, no-hype comparison.',
        category: 'Health & Nutrition',
        date: '2026-10-06',
        readTime: 5,
        featured: true,
        image: jaggeryBowl,
        shopCategory: 'Natural Sweeteners',
        body: [
            { type: 'p', text: 'Jaggery (gur) and refined white sugar start from the same place: sugarcane juice. The difference is in what happens next, and that affects colour, flavour and what ends up in your spoon.' },
            { type: 'h2', text: 'How each one is made' },
            { type: 'p', text: 'Jaggery is made by boiling fresh cane juice in open pans until it thickens, then letting it set. Nothing is separated out, so the natural molasses stays in. That is what gives jaggery its golden-to-dark-brown colour and its deep, caramel-like taste.' },
            { type: 'p', text: 'Refined sugar goes through many more steps: clarification, crystallisation, spinning in centrifuges to remove molasses, and further refining. The result is almost pure sucrose with a clean, neutral sweetness.' },
            { type: 'h2', text: 'What jaggery keeps that sugar loses' },
            { type: 'p', text: 'Because the molasses is retained, jaggery contains small amounts of minerals such as iron, potassium and magnesium, which are largely removed from white sugar. It also has a much richer flavour, so many people find they need less of it.' },
            { type: 'tip', text: 'Keep it in perspective: the mineral amounts are small at normal serving sizes. Jaggery is a better-tasting, less processed choice, not a health supplement.' },
            { type: 'h2', text: 'What stays the same' },
            { type: 'list', items: [
                'Calories are similar: both are mostly sugar.',
                'Both raise blood sugar. People with diabetes should treat jaggery like any other sugar and follow their doctor’s advice.',
                'Moderation matters for both.',
            ] },
            { type: 'h2', text: 'The bottom line' },
            { type: 'p', text: 'If you are going to use a sweetener, jaggery is a flavourful, minimally processed swap for sugar in chai, sweets, chutneys and dals. Enjoy it for its taste and tradition, and use it in moderation.' },
        ],
    },
    {
        slug: 'gur-wali-chai',
        title: 'Gur Wali Chai: How to Make Jaggery Tea Without Curdling',
        excerpt:
            'Swap sugar for jaggery in your daily chai. The one trick that stops the milk from splitting, plus the spices that make it special.',
        category: 'Recipes',
        date: '2026-10-02',
        readTime: 4,
        cover: { icon: 'Coffee', from: '#7c3f12', to: '#c07a3a' },
        shopCategory: 'Natural Sweeteners',
        recipe: {
            prepTime: 2,
            cookTime: 8,
            yield: '2 cups',
            ingredients: [
                '1 cup water',
                '1 cup milk',
                '2 tsp tea leaves',
                '2–3 tbsp grated jaggery (adjust to taste)',
                '½ inch ginger, crushed',
                '2 green cardamom pods, lightly crushed',
            ],
            steps: [
                'Boil the water with the crushed ginger and cardamom for about 2 minutes.',
                'Add the tea leaves and simmer for 1–2 minutes until the colour deepens.',
                'Pour in the milk, bring it to a boil and simmer for 2 minutes.',
                'Turn off the heat and let the chai rest for about 30 seconds.',
                'Stir in the grated jaggery until fully dissolved, then strain and serve hot.',
            ],
            tips: [
                'Always add jaggery after switching off the heat. Boiling jaggery with milk can make the milk split.',
                'Grated or powdered jaggery dissolves faster than a whole piece.',
            ],
        },
        body: [
            { type: 'p', text: 'Gur wali chai is a winter favourite across North India: the same comforting masala chai, sweetened with jaggery instead of sugar. Jaggery adds a gentle caramel note that pairs beautifully with ginger and cardamom.' },
            { type: 'p', text: 'The only catch is that jaggery and boiling milk do not always get along, and many people end up with split chai. The fix is simple: take the pan off the heat before the jaggery goes in.' },
        ],
    },
    {
        slug: 'peanut-jaggery-chikki',
        title: 'Crunchy Peanut Chikki With Just Two Main Ingredients',
        excerpt:
            'Roasted peanuts and jaggery, cooked to the perfect snap. A classic Indian sweet that is easier to make at home than you think.',
        category: 'Recipes',
        date: '2026-09-28',
        readTime: 5,
        cover: { icon: 'Cookie', from: '#8a5a12', to: '#d9a441' },
        shopCategory: 'Natural Sweeteners',
        recipe: {
            prepTime: 10,
            cookTime: 15,
            yield: 'About 16 pieces',
            ingredients: [
                '1 cup roasted peanuts, skins removed and halved',
                '¾ cup grated jaggery',
                '1 tsp ghee, plus extra for greasing',
                '1 tbsp water',
                'A pinch of cardamom powder (optional)',
            ],
            steps: [
                'Grease a plate or the back of a steel thali and a rolling pin with ghee. Keep them ready, because you will need to work fast.',
                'In a heavy pan, heat the ghee, jaggery and water on low heat, stirring until the jaggery melts completely.',
                'Let it simmer on low, stirring often, for 5–7 minutes until it darkens slightly and thickens.',
                'Check the syrup: drop a little into a bowl of cold water. It should harden at once and snap cleanly. If it is chewy, cook a little longer.',
                'Switch off the heat, add the peanuts and cardamom, and mix quickly until coated.',
                'Tip the mixture onto the greased surface and roll it out to about ¼ inch thick.',
                'Cut into squares while still warm, then let it cool completely before breaking apart.',
            ],
            tips: [
                'Undercooked syrup gives chewy chikki; overcooked syrup turns bitter. The cold-water test is your best guide.',
                'Store in an airtight container to keep it crisp.',
            ],
        },
        body: [
            { type: 'p', text: 'Chikki is one of India’s oldest travel snacks: nuts bound with jaggery into a crisp, glossy brittle. Lonavala made it famous, but every home has its own version.' },
            { type: 'p', text: 'The secret to good chikki is the jaggery syrup. Cook it to the “hard crack” stage and the chikki snaps cleanly; stop too early and it stays sticky. Use good-quality, dark jaggery for the best colour and flavour.' },
        ],
    },
    {
        slug: 'how-to-identify-pure-jaggery',
        title: 'How to Identify Pure Jaggery: 5 Simple Checks at Home',
        excerpt:
            'Bright yellow and rock hard is not always a good sign. Here is how to judge jaggery by colour, taste, texture and a quick water test.',
        category: 'Kitchen Guide',
        date: '2026-09-24',
        readTime: 4,
        image: jaggeryCloseUp,
        shopCategory: 'Natural Sweeteners',
        body: [
            { type: 'p', text: 'Not all jaggery is created equal. Some is over-processed or mixed with additives to look brighter or weigh more. These simple checks will help you choose better jaggery.' },
            { type: 'h2', text: '1. Look at the colour' },
            { type: 'p', text: 'Natural jaggery ranges from golden brown to dark brown, depending on the cane and how long the juice is boiled. Very light, bright yellow jaggery can be a sign that chemical clarifying agents were used to make it look attractive.' },
            { type: 'h2', text: '2. Taste a small piece' },
            { type: 'p', text: 'Pure jaggery tastes sweet with a rich, caramel-like depth. It should not taste salty or noticeably bitter. Saltiness can point to added mineral salts, and bitterness usually means it was burnt during boiling.' },
            { type: 'h2', text: '3. Check the texture' },
            { type: 'p', text: 'Good jaggery is firm but can be broken or grated with some effort. Look out for visible sugar crystals on the surface, which can indicate added sugar.' },
            { type: 'h2', text: '4. Try the water test' },
            { type: 'p', text: 'Dissolve a small piece in a glass of warm water and let it stand. Pure jaggery dissolves into a clear brown liquid. If you see chalky residue settling at the bottom, the jaggery may contain added fillers.' },
            { type: 'h2', text: '5. Buy from a source you trust' },
            { type: 'p', text: 'Home checks are helpful but not lab tests. The most reliable option is to buy from producers who are open about how their jaggery is made.' },
            { type: 'tip', text: 'Darker is not automatically better, and lighter is not automatically bad. Use all the checks together rather than relying on colour alone.' },
        ],
    },
    {
        slug: 'til-gud-ladoo',
        title: 'Til Gud Ladoo: The Classic Sesame & Jaggery Sweet',
        excerpt:
            'The traditional Makar Sankranti sweet made with roasted sesame seeds and jaggery. Ready in 20 minutes, no fancy equipment needed.',
        category: 'Recipes',
        date: '2026-09-19',
        readTime: 5,
        cover: { icon: 'CircleDot', from: '#6b4423', to: '#b98b5e' },
        shopCategory: 'Natural Sweeteners',
        recipe: {
            prepTime: 5,
            cookTime: 15,
            yield: 'About 15 ladoos',
            ingredients: [
                '1 cup white sesame seeds (til)',
                '¾ cup grated jaggery',
                '¼ cup roasted peanuts, coarsely crushed (optional)',
                '2 tbsp desiccated coconut (optional)',
                '½ tsp cardamom powder',
                '1 tsp ghee',
            ],
            steps: [
                'Dry roast the sesame seeds on low heat, stirring constantly, until they start to pop and turn light golden (4–5 minutes). Transfer to a plate.',
                'In the same pan, heat the ghee and add the jaggery. Melt it on low heat until it turns frothy (2–3 minutes).',
                'Check the syrup: a drop in cold water should form a soft ball.',
                'Switch off the heat and quickly mix in the sesame seeds, peanuts, coconut and cardamom.',
                'While the mixture is still warm, grease your palms with a little ghee and roll it into small ladoos.',
                'Let the ladoos cool and set, then store them in an airtight container.',
            ],
            tips: [
                'Work while the mixture is warm. If it hardens, warm it on low heat for a few seconds.',
                'Roast sesame on low heat only. Burnt sesame turns bitter.',
            ],
        },
        body: [
            { type: 'p', text: '“Til gud ghya, god god bola”: take sesame and jaggery, and speak sweetly. In Maharashtra and many parts of India, til gud ladoos are shared with family and friends on Makar Sankranti as a wish for warmth and goodwill.' },
            { type: 'p', text: 'Sesame and jaggery are a natural winter pairing, and the ladoos keep well for a couple of weeks, which makes them a great make-ahead sweet.' },
        ],
    },
    {
        slug: 'how-to-store-jaggery',
        title: 'How to Store Jaggery So It Stays Fresh for Months',
        excerpt:
            'Jaggery loves dryness and hates moisture. Simple storage habits that stop it going sticky, hard or mouldy, plus how to rescue a rock-hard block.',
        category: 'Kitchen Guide',
        date: '2026-09-15',
        readTime: 3,
        image: jaggeryPouch,
        shopCategory: 'Natural Sweeteners',
        body: [
            { type: 'p', text: 'Jaggery absorbs moisture from the air. In humid weather it can turn soft and sticky, and if it stays damp it can ferment or grow mould. Good storage is simple.' },
            { type: 'h2', text: 'The basics' },
            { type: 'list', items: [
                'Keep it in an airtight glass or steel container.',
                'Store it in a cool, dry place away from the stove and sunlight.',
                'Always use a dry spoon or knife. Even a few drops of water can spoil it.',
                'Reseal pouches tightly after every use.',
            ] },
            { type: 'h2', text: 'During monsoon or in humid cities' },
            { type: 'p', text: 'Move jaggery into the fridge in an airtight box. It will firm up, but it keeps much longer this way.' },
            { type: 'h2', text: 'If your jaggery has gone rock hard' },
            { type: 'p', text: 'Grate it rather than trying to break it. For cooking, you can also dissolve it in a little warm water and strain the syrup.' },
            { type: 'h2', text: 'When to throw it away' },
            { type: 'list', items: [
                'A sour or alcohol-like smell (a sign of fermentation)',
                'Visible mould',
                'A wet, oozing surface',
            ] },
            { type: 'tip', text: 'Always check the best-before date on the pack. Well-stored jaggery stays good much longer than jaggery left open.' },
        ],
    },
    {
        slug: 'gur-wale-meethe-chawal',
        title: 'Gur Wale Meethe Chawal: Festive Jaggery Rice',
        excerpt:
            'Fragrant basmati rice cooked in jaggery syrup with ghee, whole spices and dry fruits. A simple sweet for festivals and family lunches.',
        category: 'Recipes',
        date: '2026-09-10',
        readTime: 5,
        cover: { icon: 'CookingPot', from: '#7a4a1e', to: '#c9893f' },
        shopCategory: 'Natural Sweeteners',
        recipe: {
            prepTime: 30,
            cookTime: 25,
            yield: 'Serves 3–4',
            ingredients: [
                '1 cup basmati rice, washed and soaked for 30 minutes',
                '¾ cup grated jaggery',
                '½ cup water (for the syrup)',
                '2 tbsp ghee',
                '2 cloves',
                '3 green cardamom pods, lightly crushed',
                '10 cashews and 10 raisins',
                '2 tbsp thin coconut slices (optional)',
            ],
            steps: [
                'Boil the soaked rice in plenty of water until it is about 90% cooked. Drain and spread it out so the grains stay separate.',
                'Dissolve the jaggery in ½ cup water over low heat, then strain it to remove any impurities.',
                'Heat the ghee in a heavy pan. Fry the cashews, raisins and coconut until golden and set aside.',
                'In the same ghee, add the cloves and cardamom for a few seconds, then pour in the jaggery syrup and simmer for 2 minutes.',
                'Gently fold in the rice, cover, and cook on the lowest heat for 8–10 minutes until the syrup is absorbed.',
                'Rest for 5 minutes, then fluff gently with a fork and garnish with the fried dry fruits.',
            ],
            tips: [
                'Straining the jaggery syrup gives a cleaner colour and removes any grit.',
                'Fold the rice gently so the long grains do not break.',
            ],
        },
        body: [
            { type: 'p', text: 'Meethe chawal is made across North India for Basant Panchami, Lohri and family celebrations. Making it with jaggery instead of sugar gives the rice a warm amber colour and a deeper, caramel sweetness.' },
        ],
    },
    {
        slug: 'masala-chana-dal',
        title: 'Everyday Masala Chana Dal (With a Secret Pinch of Jaggery)',
        excerpt:
            'A hearty, protein-rich dal with a simple onion-tomato tadka. A little jaggery balances the tang, just like home cooks have always done.',
        category: 'Recipes',
        date: '2026-09-05',
        readTime: 5,
        cover: { icon: 'Soup', from: '#8a6d1f', to: '#cfae4f' },
        shopCategory: 'Pulses & Grains',
        recipe: {
            prepTime: 60,
            cookTime: 25,
            yield: 'Serves 4',
            ingredients: [
                '1 cup chana dal, washed and soaked for 1 hour',
                '3 cups water',
                '½ tsp turmeric powder and salt to taste',
                '1 tbsp ghee or oil',
                '1 tsp cumin seeds and a pinch of hing',
                '1 onion and 1 tomato, finely chopped',
                '1 tsp ginger-garlic paste and 1 green chilli, slit',
                '1 tsp red chilli powder and 1 tsp coriander powder',
                '1 tsp grated jaggery',
                '½ tsp garam masala and fresh coriander to finish',
            ],
            steps: [
                'Pressure cook the soaked dal with water, turmeric and salt for 3–4 whistles, until soft but still holding its shape.',
                'Heat the ghee, add cumin and hing, then sauté the onion until golden.',
                'Add the ginger-garlic paste and green chilli and cook for a minute.',
                'Add the tomato, chilli powder and coriander powder. Cook until the tomato is soft and the oil separates.',
                'Pour in the cooked dal and the jaggery. Simmer for 5 minutes, adding hot water if it is too thick.',
                'Finish with garam masala and chopped coriander. Serve with rice or roti.',
            ],
            tips: [
                'The jaggery should not make the dal sweet. It just rounds off the sourness of the tomato.',
                'Soaking chana dal shortens cooking time and helps it cook evenly.',
            ],
        },
        body: [
            { type: 'p', text: 'Chana dal is one of the most satisfying dals in Indian cooking: nutty, hearty and full of plant protein. This everyday version comes together with pantry staples.' },
            { type: 'p', text: 'Adding a small piece of jaggery to dal is a long-standing trick in Gujarati and Maharashtrian homes. It does not make the dal sweet; it balances the tang of the tomatoes and brings the flavours together.' },
        ],
    },
    {
        slug: 'from-sugarcane-to-jaggery',
        title: 'From Sugarcane to Jaggery: How Traditional Gur Is Made',
        excerpt:
            'Fresh cane, open pans and a lot of patience. A look at the slow, traditional process that turns sugarcane juice into golden jaggery.',
        category: 'Behind the Scenes',
        date: '2026-08-30',
        readTime: 4,
        cover: { icon: 'Factory', from: '#3f5a2a', to: '#8aa65a' },
        shopCategory: 'Natural Sweeteners',
        body: [
            { type: 'p', text: 'Jaggery-making is one of India’s oldest food crafts. The method has barely changed in centuries, and that is part of what makes good gur special.' },
            { type: 'image', src: jaggeryProcess, alt: 'Traditional jaggery making: crushed sugarcane, boiled slowly, filtered naturally, cooled naturally' },
            { type: 'h2', text: '1. Harvesting and crushing' },
            { type: 'p', text: 'Mature sugarcane is harvested and crushed soon after, while the juice is fresh. Speed matters: cane juice starts to ferment if it is left standing.' },
            { type: 'h2', text: '2. Slow boiling' },
            { type: 'p', text: 'The juice is poured into large, shallow pans and boiled for hours. As it heats, impurities rise to the top as a scum, which is skimmed off by hand. Natural clarifying agents from plants have traditionally been used to help this along.' },
            { type: 'h2', text: '3. Thickening' },
            { type: 'p', text: 'As water evaporates, the juice turns into a thick, golden syrup. Knowing exactly when it is ready takes experience. Too early and the jaggery will not set; too late and it burns.' },
            { type: 'h2', text: '4. Cooling and setting' },
            { type: 'p', text: 'The thick syrup is cooled and stirred, then poured into moulds or worked into blocks, cubes or powder. Once set, it is ready to be packed.' },
            { type: 'tip', text: 'Because nothing is separated out, jaggery keeps the natural molasses of the cane. That gives it its colour and its rich, earthy flavour.' },
        ],
    },
];

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug);

export const formatPostDate = (iso) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
