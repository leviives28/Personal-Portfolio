const params = new URLSearchParams(window.location.search);
let reviews = [];

if (params.has('review_id')) {
    document.getElementById('review_id_input').value = params.get('review_id');
}

async function get_reviews() {
    const response = await fetch('https://leviives.dev/reviews/get_reviews');
    reviews = await response.json();
    for (let rev in reviews) {
        if (!reviews[rev].review) {
            reviews.splice(rev, 1);
        }
    }
}

const escapeHTML = str =>
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );

get_reviews()
.then(() => {
    let iterator = 1;
    document.getElementById('currentReviewMessage').innerHTML = escapeHTML(reviews[0].review);
    document.getElementById('projectLink').innerHTML = !reviews[0].website ? `<p id="nolink">Closed source project</p>` : `<a href=${reviews[0].website} target="_blank" class="link">${reviews[0].website}</a>`;
    if (reviews.length > 1) {
        setInterval(() => {
            document.getElementById('currentReviewMessage').innerHTML = escapeHTML(reviews[iterator].review);
            document.getElementById('projectLink').innerHTML = !reviews[iterator].website ? `<p id="nolink">Closed source project</p>` : `<a href=${reviews[iterator].website} target="_blank" class="link">${reviews[iterator].website}</a>`;
            iterator++;
            if (iterator === reviews.length) iterator = 0;
        }, 9000)
    }
})
.catch((err) => console.error(err));

function validateForm () {
    let form = document.review_form;
    if (form.review.value.length < 25 || form.review.value.length > 255) {
        document.getElementById('review_error').style = 'display: initial;'
        form.review.focus();
        return false;
    }
    if(form.review_id.value.length !== 12 || form.review_id.value.match(/^[a-zA-Z0-9]+$/) === null) {
        document.getElementById('review_code_error').style = 'display: initial;'
        form.review_id.focus();
        return false;
    }
    form.submit();
}
