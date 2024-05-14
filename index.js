
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    return res.status(404).send(JSON.stringify({
        type: 'error',
        message: "Sorry can't find that API endpoint!",
    }));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


