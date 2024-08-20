Ext.define('Erems.library.ScheduleGrid', {
    requires : 'Erems.library.box.tools.Date',
    schedulGridOnEdit: function (controller, params, editor, e, f, g) {
        var me         = controller;
        var currentRec = e.record;

        // for field amount
        if (e.field === 'amount') {

            var currentAmount           = parseFloat(accounting.unformat(e.value));
            var currentRemainingBalance = parseFloat(accounting.unformat(currentRec.get("remaining_balance")));
            var totalJual               = parseFloat(accounting.unformat(f.down("[name=" + params.fieldHargaTotalJual + "]").getValue()));

            var s        = g.getStore();
            var totalSch = 0;
            s.each(function (rec) {
                totalSch += parseFloat(accounting.toFixed(rec.get("amount"), 2));

            });
            var balance = accounting.toFixed((totalJual - totalSch), 2);

            currentRec.beginEdit();
            currentRec.set({
                remaining_balance : accounting.toFixed(e.value, 2)
            });
            currentRec.endEdit();

            /// added 4 Maret 2015
            /// update billing rules
            var currentScheduleType = currentRec.get("scheduletype_scheduletype");
            var totalAmountByST = 0;

            var totalAmountByTandaJadi = 0;
            s.each(function (rec) {
                if (rec.get("scheduletype_scheduletype") === currentScheduleType) {
                    totalAmountByST += parseFloat(accounting.toFixed(rec.get("amount"), 2));
                }
                if (rec.get("scheduletype_scheduletype") === "TJ") {
                    totalAmountByTandaJadi += parseFloat(accounting.toFixed(rec.get("amount"), 2));
                }
            });

            if (g.xtype === 'purchaseletterschedulegrid') {
                switch (currentScheduleType) {
                    case 'UM':
                        var temp = window[me.prolibsFile].getUangMukaSchGridToBilRules(totalAmountByST, totalAmountByTandaJadi);
                        // f.down("[name=billingrules_uangmuka]").setValue(accounting.formatMoney(totalAmountByST));
                        f.down("[name=billingrules_uangmuka]").setValue(accounting.formatMoney(temp));
                        break;
                    case 'TJ':
                        f.down("[name=billingrules_tandajadi]").setValue(accounting.formatMoney(totalAmountByST));
                        break;
                    default:
                        f.down("[name=billingrules_angsuran]").setValue(accounting.formatMoney(totalAmountByST));
                        break;
                }
            }

            // add balance to last record in schedule
            var lastRec      = s.getAt(s.getCount() - 1);
            var lastRecValue = accounting.toFixed(lastRec.get('amount'), 2);
            lastRecValue     = parseFloat(lastRecValue) + parseFloat(balance);
            if (lastRec) {
                lastRec.beginEdit();
                lastRec.set({
                    amount            : accounting.toFixed(lastRecValue, 2),
                    remaining_balance : accounting.toFixed(lastRecValue, 2)
                });
                lastRec.endEdit();
            }


            var final_totalSch = 0;
            var final_store    = g.getStore();
            final_store.each(function (rec) {
                final_totalSch += parseFloat(accounting.toFixed(rec.get("amount"), 2));
            });
            final_totalSch = parseFloat(accounting.toFixed(final_totalSch, 2));

            var final_balance = (totalJual - final_totalSch);

            if (f.down("[name=balance_value]")) {
                f.down("[name=balance_value]").setValue(final_balance);
            }
        } 
        else if (e.field === 'sourcemoney_sourcemoney') {
            var c = editor.editors.items[0].items.items[0];
            if (!c) {
                return;
            }

            var idx = c.getStore().findExact('sourcemoney', c.getValue());
            if (idx < 0) {
                return;
            }

            var rec = c.getStore().getAt(idx);
            if (rec) {
                currentRec.beginEdit();
                currentRec.set({
                    sourcemoney_sourcemoney_id: rec.get('sourcemoney_id')
                });
                currentRec.endEdit();
            }
        }
    },
    schGridCellClick: function (el, record, rowIndex) {
    },
    addNewSchedule: function (controller, params, f, g) {
        var me = controller;
        var that = this;
        var s = g.getStore();
        var totalRecord = s.getCount();
        var lastRec = s.getAt(totalRecord - 1);
        var tempData = {
            date                      : null,
            scheduletype_scheduletype : null,
            termin                    : 0,
            remaining_balance         : 0,
            amount                    : 0,
            sourcemoney_sourcemoney   : 'CUSTOMER'
        };
        /// set default value
        tempData.date = typeof params.purchase_date === "undefined" ? f.down("[name=purchase_date]").getValue() : params.purchase_date;
        tempData.scheduletype_scheduletype = "TJ";
        tempData.termin = 1;
        // end set default value

        if(typeof params.ppndtp != "undefined"){
            tempData.date                      = params.ppndtp.duedate;
            tempData.scheduletype_scheduletype = 'PPNDTP';
            tempData.termin                    = 1;
            tempData.sourcemoney_sourcemoney   = lastRec.get('sourcemoney_sourcemoney');
            tempData.amount                    = params.ppndtp.amount;
        } 
        else{
            if (lastRec) {
                var myDate = new Erems.library.box.tools.Date({
                    date: lastRec.get('duedate')
                });

                tempData.date                      = myDate.addMonth(1);
                tempData.scheduletype_scheduletype = lastRec.get('scheduletype_scheduletype');
                tempData.termin                    = controller.tools.intval(lastRec.get('termin')) + 1;
                tempData.sourcemoney_sourcemoney   = lastRec.get('sourcemoney_sourcemoney');
            }
        }

        s.add({
            duedate                   : tempData.date,
            scheduletype_scheduletype : tempData.scheduletype_scheduletype,
            termin                    : tempData.termin,
            remaining_balance         : tempData.remaining_balance,
            sourcemoney_sourcemoney   : tempData.sourcemoney_sourcemoney,
            amount                    : tempData.amount
        });

        /*
         s.add({
         duedate: newDate,
         scheduletype_scheduletype: lastRec.get('scheduletype_scheduletype'),
         termin: controller.tools.intval(lastRec.get('termin')) + 1,
         remaining_balance: 0,
         sourcemoney_sourcemoney: lastRec.get('sourcemoney_sourcemoney'),
         amount: 0
         });
         */

        g.getSelectionModel().select((s.getCount()) - 1);
        that.balanceCalculate(me, params, f, g);

    },
    addNewScheduleDynamic: function (controller, params, f, g) {
        var me = controller;
        var that = this;
        var s = g.getStore();
        var totalRecord = s.getCount();
        var lastRec = s.getAt(totalRecord - 1);
        ///////// count date
        var myDate = new Erems.library.box.tools.Date({
            date: lastRec.get('duedate')
        });
        var newDate = myDate.addMonth(1);
        ////////// end count date
        s.add({
            duedate                   : newDate,
            scheduletype_scheduletype : params.scheduletype,
            termin                    : lastRec.get('termin') + 1,
            remaining_balance         : params.remaining_balance,
            sourcemoney_sourcemoney   : lastRec.get('sourcemoney_sourcemoney'),
            amount                    : params.amount
        });
        g.getSelectionModel().select((s.getCount()) - 1);
        that.balanceCalculate(me, params, f, g);

    },
    removeSchedule: function (controller, params, f, g, mainGrid) {
        var me = controller;
        var that = this;
        //  var g = me.getSchedulegrid();
        var sm = g.getSelectionModel();
        if (sm.hasSelection()) {
            var selc = sm.getSelection();
            for (var i in selc) {
                var id = me.tools.intval(selc[i].get("schedule_id"));
                if (selc[i].get("scheduletype_scheduletype") == 'PPNDTP' || me.tools.floatval(selc[i].get("amount")) === me.tools.floatval(selc[i].get("remaining_balance"))) {
                    if (id > 0) {
                        me.tools.gridHelper(mainGrid).maindetailUpdateDeletedRows(f, selc[i].get("schedule_id"));
                    }
                    g.getStore().remove(selc[i]);
                    that.balanceCalculate(me, params, f, g);
                }

                // var s = me.getGriddetail().getStore();

            }
        }



    },
    balanceCalculate: function (controller, params, f, g) {
        var me = controller;

        var totalJual = accounting.unformat(f.down("[name=" + params.fieldHargaTotalJual + "]").getValue());
        var s = g.getStore();
        var totalSch = 0;
        s.each(function (rec) {
            var x = me.tools.floatval(rec.get("amount")).toFixed(2);
            totalSch += me.tools.floatval(x);

        });


        var balance = (me.tools.floatval(totalJual).toFixed(2) - me.tools.floatval(totalSch).toFixed(2));
        if (f.down("[name=balance_value]")) {
            f.down("[name=balance_value]").setValue(balance);
        }

    },
    getNilaiSelisih: function (controller, params, f, g) {
        var me = controller;

        var totalJual = accounting.unformat(f.down("[name=" + params.fieldHargaTotalJual + "]").getValue());
        var s = g.getStore();
        var totalSch = 0;
        s.each(function (rec) {
            var x = me.tools.floatval(rec.get("amount")).toFixed(2);
            totalSch += me.tools.floatval(x);

        });


        var balance = (me.tools.floatval(totalJual).toFixed(2) - me.tools.floatval(totalSch).toFixed(2));
        return balance;


    },
    schedulGridOnBeforeEdit: function (editor, e) {
        var currentRec = e.record;

        var currentAmount = accounting.unformat(currentRec.get("amount"));
        var currentRemainingBalance = accounting.unformat(currentRec.get("remaining_balance"));

        if (currentRemainingBalance < currentAmount && currentRec.get("schedule_id") > 0) {
            return false;
        }
        return true;

    },
    rencanaSerahTerimaOnKeyUp: function (controller, params) {
        var me = controller;
        var f = me.getFormdata();
        var bulan = me.tools.intval(f.down("[name=rencana_serahterima]").getValue());
        var date = f.down("[name=" + params.dateField + "]").getValue();
        var m = me.tools.intval(date.getMonth());
        var y = date.getFullYear();
        m = (m + bulan) + 1;
        var newYear = Math.floor(m / 12);
        var newMonth = m % 12;

        date.setFullYear(y + newYear);
        date.setMonth(newMonth - 1);

        f.down("[name=rencana_serahterima_date]").setValue(date);
    },
    rencanaSerahTerimaDateOnSelect: function (controller, params) {
        var me = controller;
        var f = me.getFormdata();
        var now = f.down("[name=" + params.dateField + "]").getValue();
        var then = f.down("[name=" + params.dateFieldThen + "]").getValue();
        var durasi = moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"))).format("d");
        f.down("[name=rencana_serahterima]").setValue(durasi);



    },

    splitSchedule: function (controller, params, f, g) {
        // splitSchedule: function(f, g, mainGrid) {
        var me = this;
        //  var g = me.getSchedulegrid();
        var sm = g.getSelectionModel();

        var hasil = {
            hasil: false,
            pesan: "Proses split schedule.."
        };



        //

        if (sm.hasSelection()) {
            var selc = sm.getSelection();
            // hanya 1 record saja
            selc = selc[0];
            if (controller.tools.floatval(selc.get("remaining_balance")) > 0.0 && (controller.tools.floatval(selc.get("amount")) > controller.tools.floatval(selc.get("remaining_balance")))) {


                var s = g.getStore();
                var totalRecord = s.getCount();
                var lastRec = selc;

                var tempAmount = lastRec.get('amount');
                var tempRb = lastRec.get('remaining_balance');

                s.insert(g.getStore().indexOf(selc) + 1, {
                    duedate: lastRec.get('duedate'),
                    scheduletype_scheduletype: lastRec.get('scheduletype_scheduletype'),
                    termin: lastRec.get('termin'),
                    remaining_balance: tempRb,
                    sourcemoney_sourcemoney: lastRec.get('sourcemoney_sourcemoney'),
                    amount: tempRb
                });


                selc.beginEdit();
                selc.set({
                    amount: tempAmount - tempRb,
                    remaining_balance: 0.0
                });
                selc.endEdit();




                g.getSelectionModel().select((s.getCount()) - 1);
                controller.balanceCalculate(f, g);
                hasil.hasil = true;


            } else {
                 hasil.pesan = "Jumlah sisa tagihan harus lebih kecil dari tagihan dan sisa tagihan harus lebih besar dari nol.";
               // console.log("[SCH_ER] Remaining balance harus lebih besar dari nol dan amount harus lebih besar dari remaining balance");
            }

        } else {
           // console.log("[SCH_ER] Tidak ada selection");
            hasil.pesan = "Silahkan pilih tagihan terlebih dahulu.";
        }

        return hasil;

    }
});
