export default{
    PORT: process.env.PORT || 5000,
                                          //'mongodb://localhost/amazona',
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://yorton:0901@cluster0.vjqhc.mongodb.net/y-mart?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
}