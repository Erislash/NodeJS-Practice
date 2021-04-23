exports.notFoundPages = (request, response) => {
    response.status(404).render('404.ejs', {pageTitle: 'Not found'});
};