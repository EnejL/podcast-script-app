let screenWidth = screen.width;

let totalsTitle = $('.aside-totals-title');
let totalsBody = $("#aside-totals-body");

function displayTotals() {
	if ((!totalsBody.hasClass('show-totals-body')) && (screenWidth <= 580)) {
		totalsBody.addClass('show-totals-body');
		totalsTitle.addClass('show-totals-body');
	} else {
		totalsBody.removeClass('show-totals-body');
		totalsTitle.removeClass('show-totals-body');
	}
}
