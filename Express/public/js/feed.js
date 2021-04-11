const bodies = document.querySelectorAll('.post__body');

bodies.forEach(b => {
    const body = b.textContent;
    const seeMore = () => {
        b.innerHTML = body;
    }

    b.innerHTML = (body.length > 100) ? `${body.slice(0, 100)}...<span class="post__more">See more</span>` : body;
    b.querySelector('.post__more')?.addEventListener('click', seeMore);
})