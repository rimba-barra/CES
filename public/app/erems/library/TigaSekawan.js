Ext.define('Erems.library.TigaSekawan', {
    /*@param store ( store dari grid schedule
     *@param scehduleTypeCode ( kolom price type ) */
    validasiDaftarTagihan: function (store, scehduleTypeCode="") {
        var me = this;
        var hasil = {
            "msg": "",
            "hasil": false
        };
        // jika ada type dan termin yang sama
        var tempTypeTermin = [];
        var validType = ["TJ", "UM", "DC", "PU", "SIP", "KPR", "INH", "PPNDTP"];


        var foundError = false;
        var jmlKPR = 0;
        var jmlINH = 0;
        var jmlSIP = 0;


        for (var i = 0; i < store.getCount(); i++) {
            var rec = store.getAt(i);

            var st = rec.get("scheduletype_scheduletype");

            var temp = st + "_" + rec.get("termin");
            if (tempTypeTermin.indexOf(temp) >= 0) {
                hasil.msg += "Terdapat duplikasi tagihan " + st + " " + rec.get("termin") + ". ";
                foundError = true;
                //  break;
            }
            tempTypeTermin.push(temp);

            if (validType.indexOf(st) < 0) {
                hasil.msg += "Tipe pembayaran " + rec.get("scheduletype_scheduletype") + " tidak valid. ";
                foundError = true;
            }

            if (rec.get("scheduletype_scheduletype") == "KPR") {
                jmlKPR++;
            }
            if (rec.get("scheduletype_scheduletype") == "SIP") {
                jmlSIP++;
            }
            if (rec.get("scheduletype_scheduletype") == "INH") {
                jmlINH++;
            }


        }

        // cek jika KPR, jumlah KPR harus berjumlah = 1
        if (scehduleTypeCode == "KPR" && jmlKPR !== 1) {
            hasil.msg += "Tagihan KPR tidak ada atau tagihan KPR lebih dari satu.";
            foundError = true;
        }
        if (scehduleTypeCode == "INH" && jmlINH < 1) {
            hasil.msg += "Tagihan INH tidak ada.";
            foundError = true;
        }
        if (scehduleTypeCode == "SIP" && jmlSIP < 1) {
            hasil.msg += "Tagihan SIP tidak ada.";
            foundError = true;
        }



        if (!foundError) {
            hasil.msg = "validasi sukses";
            hasil.hasil = true;
        }


        console.log(hasil);

        return hasil;
    }
});