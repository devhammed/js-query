document.addEventListener('DOMContentLoaded', () => {
    $q('#stuff').hide();

    $q('#place').html($q('p').parent().html()).find('p').prepend('stuff & ').append(' and some junk!').addClass('bold');

    $qa('ul li').addClass('red');

    $q('#type-it').val($q('#select-it').val());

    $q('#click-it').addEventListener('click', (e) => alert($q('#type-it').val()));

    $q('ul').append('<li>wft?</li>');

    $q('#stuff').markup('<h6>A new thing!</h6>');
});

$q('ul').on('click', 'li', (e) => e.target.removeClass('red').addClass('blue').toggleClass('bold'));

// $q(document).on('click','#type-it', (e) => console.log('click', e.target.value));
// $q(document).on('click','#type-it', (e) => console.log('click(2)', e.target.value));
// $q(document).on('focus','#type-it', (e) => console.log('focus', e.target.value));
// $q(document).on('blur','#type-it', (e) => console.log('blur', e.target.value));
// $q(document).on('change','#type-it', (e) => console.log('change', e.target.value));
// $q(document).on('input','#type-it', (e) => console.log('input', e.target.value));

setTimeout(() => {
    // console.log('off()');
    $q('ul').off('click', 'li');
}, 5000);
