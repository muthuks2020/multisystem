// File: data.js

// Product Database
const products = [
    {
        id: 1,
        name: 'Nike AirZoom Pro Runner',
        brand: 'Nike',
        price: 95,
        image: '👟',
        rating: 4.8,
        reviews: 234,
        features: [
            { name: 'Waterproof', value: '90%', icon: 'fa-water' },
            { name: 'Cushioning', value: '85%', icon: 'fa-compress' },
            { name: 'Breathable Mesh', value: 'Yes', icon: 'fa-wind' }
        ],
        stock: 2,
        stores: [
            { name: 'Brigade Road', distance: '1.2km', quantity: 2 },
            { name: 'MG Road', distance: '3.5km', quantity: 1 }
        ],
        matchScore: 95,
        description: 'Perfect for monsoon running with exceptional waterproofing and cushioning technology.',
        specifications: {
            weight: '285g',
            heelDrop: '10mm',
            upperMaterial: 'Gore-Tex Mesh',
            soleTechnology: 'Nike Air Zoom'
        },
        category: 'running_shoes',
        season: 'monsoon',
        useCases: ['outdoor_running', 'wet_weather', 'long_distance']
    },
    {
        id: 2,
        name: 'Adidas Ultraboost 22',
        brand: 'Adidas',
        price: 89,
        image: '👟',
        rating: 4.9,
        reviews: 456,
        features: [
            { name: 'Waterproof', value: '70%', icon: 'fa-water' },
            { name: 'Cushioning', value: '95%', icon: 'fa-compress' },
            { name: 'Lightweight', value: '265g', icon: 'fa-feather' }
        ],
        stock: 5,
        stores: [
            { name: 'Koramangala', distance: '2.1km', quantity: 3 },
            { name: 'Indiranagar', distance: '4.2km', quantity: 2 }
        ],
        matchScore: 92,
        description: 'Best-in-class cushioning with Boost technology. Ideal for comfort-focused runners.',
        specifications: {
            weight: '265g',
            heelDrop: '10mm',
            upperMaterial: 'Primeknit',
            soleTechnology: 'Boost Foam'
        },
        category: 'running_shoes',
        season: 'all_weather',
        useCases: ['daily_training', 'long_distance', 'recovery_runs']
    },
    {
        id: 3,
        name: 'Puma Nitro Elite',
        brand: 'Puma',
        price: 75,
        image: '👟',
        rating: 4.6,
        reviews: 189,
        features: [
            { name: 'Waterproof', value: '85%', icon: 'fa-water' },
            { name: 'Cushioning', value: '70%', icon: 'fa-compress' },
            { name: 'Durability', value: 'High', icon: 'fa-shield-alt' }
        ],
        stock: 8,
        stores: [
            { name: 'Whitefield', distance: '5.5km', quantity: 5 },
            { name: 'HSR Layout', distance: '3.8km', quantity: 3 }
        ],
        matchScore: 88,
        description: 'Budget-friendly option with excellent durability. Great for beginners.',
        specifications: {
            weight: '295g',
            heelDrop: '8mm',
            upperMaterial: 'Engineered Mesh',
            soleTechnology: 'Nitro Foam'
        },
        category: 'running_shoes',
        season: 'monsoon',
        useCases: ['casual_running', 'gym', 'walking']
    }
];

// Complementary Products
const complementaryProducts = [
    {
        id: 101,
        name: 'Waterproof Spray Protection',
        price: 12,
        image: '🧴',
        description: 'Extends shoe waterproofing by 3x',
        purchaseFrequency: 68
    },
    {
        id: 102,
        name: 'Moisture-Wicking Socks',
        price: 15,
        image: '🧦',
        description: 'Keep feet dry during monsoon runs',
        purchaseFrequency: 45
    },
    {
        id: 103,
        name: 'Running Shoe Insoles',
        price: 25,
        image: '👣',
        description: 'Extra cushioning and arch support',
        purchaseFrequency: 32
    }
];

// Agent Processing Steps
const agentSteps = [
    {
        id: 1,
        name: 'Product Discovery Agent',
        description: 'Analyzing natural language query',
        icon: 'fa-brain',
        color: '#4daae8',
        duration: 1000,
        details: {
            technology: 'Amazon Bedrock (Claude)',
            actions: [
                'Parse customer query',
                'Extract category: running_shoes',
                'Identify weather context: monsoon',
                'Extract features: cushioning (high), waterproof',
                'Extract constraints: price <= $100, size = 9'
            ],
            output: {
                category: 'running_shoes',
                attributes: {
                    waterproof: true,
                    cushioning_level: 'high',
                    use_case: 'outdoor_running'
                },
                constraints: {
                    max_price: 100,
                    size: 9
                },
                context: 'seasonal_monsoon'
            }
        }
    },
    {
        id: 2,
        name: 'Knowledge Graph Query Agent',
        description: 'Querying Neo4j knowledge graph',
        icon: 'fa-project-diagram',
        color: '#ff9900',
        duration: 1500,
        details: {
            technology: 'Neo4j Graph Database',
            actions: [
                'Execute multi-hop Cypher query',
                'Traverse Product → Feature relationships',
                'Match Season (monsoon) requirements',
                'Check Customer preference history',
                'Calculate similarity scores',
                'Found 1,247 products matching criteria'
            ],
            graphTraversal: {
                nodes: ['Product', 'Feature', 'Season', 'Customer'],
                relationships: ['HAS_FEATURE', 'SUITABLE_FOR', 'PREFERS'],
                hops: 5
            }
        }
    },
    {
        id: 3,
        name: 'Inventory Agent',
        description: 'Checking real-time inventory',
        icon: 'fa-warehouse',
        color: '#146eb4',
        duration: 1200,
        details: {
            technology: 'AWS SageMaker + Neo4j',
            actions: [
                'Query live inventory across 12 stores',
                'Check stock levels for top matches',
                'Calculate delivery time estimates',
                'Verify size availability',
                'Identify nearby store locations',
                'Filter to 10 in-stock products'
            ],
            storesChecked: 12,
            productsFiltered: 10
        }
    },
    {
        id: 4,
        name: 'Comparison Agent',
        description: 'Comparing product features',
        icon: 'fa-balance-scale',
        color: '#10b981',
        duration: 1000,
        details: {
            technology: 'Amazon Bedrock + Neo4j Analytics',
            actions: [
                'Generate feature comparison matrix',
                'Analyze trade-offs (price vs features)',
                'Rank by user priority (cushioning > price)',
                'Calculate match scores',
                'Generate natural language insights'
            ],
            comparisonFactors: ['cushioning', 'waterproof', 'price', 'stock', 'distance']
        }
    },
    {
        id: 5,
        name: 'Experience Orchestrator',
        description: 'Optimizing recommendations',
        icon: 'fa-magic',
        color: '#7c3aed',
        duration: 800,
        details: {
            technology: 'Amazon Bedrock + Custom Logic',
            actions: [
                'Manage conversation flow',
                'Identify upsell opportunities',
                'Suggest complementary products',
                'Generate empathetic response',
                'Stream results to user interface'
            ],
            suggestedProducts: complementaryProducts.length
        }
    }
];

// Analytics Data
const analyticsData = {
    kpis: [
        { label: 'Active Users', value: 12543, change: 12, unit: '', icon: 'fa-users' },
        { label: 'Conversion Rate', value: 34.2, change: 8, unit: '%', icon: 'fa-shopping-cart' },
        { label: 'Avg Response Time', value: 1.2, change: -15, unit: 's', icon: 'fa-clock' },
        { label: 'Match Accuracy', value: 95, change: 5, unit: '%', icon: 'fa-trophy' }
    ],
    agentPerformance: [
        { name: 'Product Discovery Agent', time: '245ms', success: 98 },
        { name: 'Knowledge Graph Query', time: '412ms', success: 99 },
        { name: 'Inventory Agent', time: '189ms', success: 97 },
        { name: 'Comparison Agent', time: '321ms', success: 96 },
        { name: 'Experience Orchestrator', time: '156ms', success: 99 }
    ],
    topQueries: [
        { query: 'Running shoes monsoon', count: 1247 },
        { query: 'Formal shoes under $150', count: 892 },
        { query: 'Hiking boots waterproof', count: 654 },
        { query: 'Sneakers breathable summer', count: 543 },
        { query: 'Sports shoes cushioning', count: 421 }
    ],
    neo4jMetrics: {
        productsAnalyzed: 1247,
        maxGraphTraversal: '5-hop',
        relationshipEdges: '10,000+',
        avgQueryTime: '412ms'
    }
};

// Customer Profile
const customerProfile = {
    id: 'sarah_j',
    name: 'Sarah Johnson',
    location: 'Bengaluru, India',
    budget: 100,
    size: 9,
    preferences: {
        brands: ['Nike', 'Adidas'],
        features: ['cushioning', 'waterproof'],
        pastPurchases: ['wide_fit_sneakers', 'running_shorts']
    }
};

// Export data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        complementaryProducts,
        agentSteps,
        analyticsData,
        customerProfile
    };
}