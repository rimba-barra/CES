// Closure
(function() {

    function tKouti() {
        this.version = function() {
            console.log("1.0.0");
        }
        this.intval = function(val) {
            var m = parseInt(val);
            m = isNaN(m) ? 0 : m;
            return m;
        }





        this.date = {
            toDate: function(day, month, year) {
                var d = new Date();
                d.setDate(kouti.intval(day));
                d.setMonth(kouti.intval(month) - 1);
                d.setFullYear(kouti.intval(year));
                return d;
            },
            monthYear: {
                isValid: function(text) {
                    var ar = text.split("/");

                    if (ar.length == 2) {
                        if (kouti.date.month.isValid(ar[0]) && kouti.date.year.isValid(ar[1])) {
                            return true;
                        }
                    }
                    return false;
                },
                toDate: function(text) {
                    if (this.isValid(text)) {
                        var ar = text.split("/");

                        return kouti.date.toDate(1, ar[0], ar[1]);
                    }
                    return false;
                }


            },
            month: {
                isValid: function(month) {
                    month = kouti.intval(month);
                    if (month >= 1 && month <= 12) {
                        return true;
                    }
                    return false;
                }

            },
            year: {
                isValid: function(year) {
                    year = kouti.intval(year);
                    if (year >= 1900 && year <= 2999) {
                        return true;
                    }
                    return false;
                }

            },
            time: {
                /*@format 00:00:00*/
                isValid: function(text) {
                    var pattern = "/^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/";
                    if (!text.match(pattern))
                        return false;
                    return true;
                    // /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/
                }
            }
        }


    }


    if (window.kouti === undefined) {
        window.kouti = new tKouti();
    }



})();




