Ext.define('Hrd.controller.Overtimetransaction', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Overtimetransaction',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'overtimetransaction',
    formWidth: 600,
    refs: [],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Overtimetransaction',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
        indexLembur: null
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'overtime_id',
    overtimeParameters: null,
    myParams: null,
    shiftInfo: null,
    validShift: false,
    currentStatusLembur: 0,
    validLembur: false,
    overtimeValue: 0,
    tempMatchIndeksLembur: null,
    constructor: function(configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);

        me.registerMiniCtrlAlt('employeeovertimetran', new Hrd.minic.lookup.Employee({
            controllerName: me.bindPrefixName,
            panelId: me.controllerName + 'employee' // make sure this value same as params that passed when calling instantwindow
        }));

        this.callParent(arguments);
    },
    init: function() {
        var me = this;
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();
        var hourObjects = ['plan_before_start', 'plan_before_end', 'plan_after_start',
            'plan_after_end', 'exec_time_out_start', 'exec_time_out_end',
            'exec_time_in_start', 'exec_time_in_end'];
        for (var x in hourObjects) {
            this.control(events.timeInput('overtimetransactionformdata', me.tools.inputHoursObjects(hourObjects[x])));

        }

        //lookup_employee
        newEvs['overtimetransactionformdata button[action=lookup_employee]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };
        newEvs['overtimetransactionformdata button[action=process]'] = {
            click: function() {
                me.processData();
            }

        };
        newEvs['overtimetransactionformdata [name=exec_time_in_start]'] = {
            blur: function() {
                // me.timeOnBlur();
            }

        };
        newEvs['overtimetransactionformdata [name=exec_time_in_end]'] = {
            blur: function() {
                //   me.timeOnBlur();
            }

        };
        newEvs['overtimetransactionformdata [name=exec_time_out_start]'] = {
            blur: function() {
                //   me.timeOnBlur();
            }

        };
        newEvs['overtimetransactionformdata [name=exec_time_out_end]'] = {
            blur: function() {
                //  me.timeOnBlur();
            }

        };
        newEvs['overtimetransactionformdata [name=date]'] = {
            select: function() {
                me.dateOnChange();
            }

        };
        newEvs['overtimetransactionformdata [name=status]'] = {
            select: function() {
                me.statusOnSelect();
            }

        };



        this.control(newEvs);

    },
    processData: function() {
        var me = this;
        me.resetSummary();
        me.timeOnBlur();
    },
    statusOnSelect: function() {
        var me = this;
        var f = me.getFormdata();
        var si = me.shiftInfo;
        var status = f.down("[name=status]").getValue();
        if (!si) {
            console.log("Tidak ada informasi shift");
            return false;
        }

        me.currentStatusLembur = status;
        me.resetSummary();
        me.resetTime();

        if (status === 1) {
            f.down("[name=plan_before_start]").setValue(si["time_in"]);
            f.down("[name=plan_before_end]").setValue(si["in_time"]);

            f.down("[name=exec_time_in_end]").setValue(si["in_time"]);
            f.down("[name=exec_time_in_start]").setValue(f.down("[name=plan_before_start]").getValue());
            //f.down("[name=exec_time_in_end]").setReadOnly(true);
        } else if (status === 2) {
            f.down("[name=plan_after_start]").setValue(si["out_time"]);
            f.down("[name=plan_after_end]").setValue(si["time_out"]);
            f.down("[name=exec_time_out_start]").setValue(si["out_time"]);
            f.down("[name=exec_time_out_end]").setValue(f.down("[name=plan_after_end]").getValue());
            // f.down("[name=exec_time_out_start]").setReadOnly(true);
        } else if (status === 3) {
            f.down("[name=plan_before_start]").setValue(si["time_in"]);
            f.down("[name=plan_before_end]").setValue(si["in_time"]);
            f.down("[name=plan_after_start]").setValue(si["out_time"]);
            f.down("[name=plan_after_end]").setValue(si["time_out"]);
            f.down("[name=exec_time_in_end]").setValue(si["in_time"]);
            f.down("[name=exec_time_out_start]").setValue(si["out_time"]);
            f.down("[name=exec_time_in_start]").setValue(f.down("[name=plan_before_start]").getValue());
            f.down("[name=exec_time_out_end]").setValue(f.down("[name=plan_after_end]").getValue());
        }
        me.timeOnBlur();
    },
    resetShiftInfo: function() {
        var me = this;
        var f = me.getFormdata();
        f.down("[name=shifttype_code]").setValue("");
        f.down("[name=in_time]").setValue("");
        f.down("[name=out_time]").setValue("");
        f.down("[name=work_hour_text]").setValue("");
        f.down("[name=day_name]").setValue("");
    },
    resetTime: function() {
        var me = this;
        var f = me.getFormdata();
        var zero = "";
        f.down("[name=exec_time_in_start]").setValue(zero);
        f.down("[name=exec_time_in_end]").setValue(zero);
        f.down("[name=exec_time_out_start]").setValue(zero);
        f.down("[name=exec_time_out_end]").setValue(zero);
        f.down("[name=plan_before_start]").setValue(zero);
        f.down("[name=plan_before_end]").setValue(zero);
        f.down("[name=plan_after_start]").setValue(zero);
        f.down("[name=plan_after_end]").setValue(zero);

    },
    dateOnChange: function() {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormdata();
        me.validShift = false;
        p.setLoading("Cek informasi shift...");
        f.down("[name=shifttype_code]").setValue("");
        var vs = f.getForm().getValues();
        me.resetShiftInfo();
        me.resetSummary();
        me.tools.ajax({
            params: vs,
            success: function(data, model) {
                console.log(data);

                var hasil = me.tools.shortHasilArray(data);
                if (hasil.length > 0) {

                    hasil = hasil[0];
                    me.shiftInfo = hasil;
                    // console.log(me.shiftInfo);


                    var diffTime = me.tools.diffTime(hasil["in_time"], hasil["out_time"]);

                    f.down("[name=shifttype_code]").setValue(hasil["shifttype"]);
                    f.down("[name=in_time]").setValue(hasil["in_time"]);
                    f.down("[name=out_time]").setValue(hasil["out_time"]);
                    f.down("[name=work_hour_text]").setValue(me.tools.timeToDecimal(diffTime));
                    f.down("[name=day_name]").setValue(me.tools.dateFunc(vs['date']).getDayWeekName());


                    /*
                     if(me.tools.timeToDecimal(hasil["time_in"]) > 0 && me.tools.timeToDecimal(hasil["time_out"]) > 0){
                     f.down("[name=plan_before_start]").setValue(hasil["time_in"]);
                     f.down("[name=plan_before_end]").setValue(hasil["in_time"]);
                     f.down("[name=plan_after_start]").setValue(hasil["out_time"]);
                     f.down("[name=plan_after_end]").setValue(hasil["time_out"]);
                     }
                     */



                    me.validShift = true;



                } else {
                    me.tools.alert.warning("Tida ada Informasi Shift");
                }

                me.resetFieldsPelaksanaanLembur(1);
                me.resetFieldsPelaksanaanLembur(0);

                me.timeOnBlur();
                p.setLoading(false);
            }
        }).read('shiftinfo');


    },
    /* isLeft = 1 => kiri, 0 = kanan */
    getProcessField: function(isLeft) {
        var me = this;
        var sl = isLeft;
        var fields = {
            params: {
                start: sl === 1 ? 'exec_time_in_start' : 'exec_time_out_start',
                end: sl === 1 ? 'exec_time_in_end' : 'exec_time_out_end'
            },
            totalHour: {
                duration: sl === 1 ? 'before_duration_text' : 'after_duration_text',
                net: sl === 1 ? 'before_net_hours' : 'after_net_hours',
                total: sl === 1 ? 'before_total_hours' : 'after_total_hours',
                break: sl === 1 ? 'before_break_duration' : 'after_break_duration'
            },
            faktor: {
                satup: sl === 1 ? 'before_factor_factor1' : 'after_factor_factor1',
                satuv: sl === 1 ? 'before_factor_value1' : 'after_factor_value1',
                satuh: sl === 1 ? 'before_factor_result1' : 'after_factor_result1',
                duap: sl === 1 ? 'before_factor_factor2' : 'after_factor_factor2',
                duav: sl === 1 ? 'before_factor_value2' : 'after_factor_value2',
                duah: sl === 1 ? 'before_factor_result2' : 'after_factor_result2',
                tigap: sl === 1 ? 'before_factor_factor3' : 'after_factor_factor3',
                tigav: sl === 1 ? 'before_factor_value3' : 'after_factor_value3',
                tigah: sl === 1 ? 'before_factor_result3' : 'after_factor_result3'

            }
        };
        return fields;
    },
    resetFieldsPelaksanaanLembur: function(isLeft) {
        var me = this;
        var f = me.getFormdata();
        var pf = me.getProcessField(isLeft);
        for (var i in pf) {
            for (var k in pf[i]) {
                var el = f.down("[name=" + pf[i][k] + "]");

                if (el) {
                    el.setValue("");
                }
            }
        }

    },
    timeOnBlur: function() {
        var me = this;

        var f = me.getFormdata();
        var status = f.down("[name=status]").getValue();
        console.log(status);
        if (!status) {
            console.log("Status lembur tidak valid");
            return false;
        }



        if (status === 1) { // sebelum jam masuk
            var pf = me.getProcessField(1);
            var tempStart = f.down("[name=" + pf.params.start + "]").getValue();
            var tempEnd = f.down("[name=" + pf.params.end + "]").getValue();
            me.resetFieldsPelaksanaanLembur(1);
            me.resetFieldsPelaksanaanLembur(0);
            f.down("[name=" + pf.params.start + "]").setValue(tempStart);
            f.down("[name=" + pf.params.end + "]").setValue(tempEnd);
            me.processLembur(1, 1, 1);
        } else if (status == 2) { // setelah jam pulang
            var pf = me.getProcessField(0);
            var tempStart = f.down("[name=" + pf.params.start + "]").getValue();
            var tempEnd = f.down("[name=" + pf.params.end + "]").getValue();
            me.resetFieldsPelaksanaanLembur(1);
            me.resetFieldsPelaksanaanLembur(0);
            f.down("[name=" + pf.params.start + "]").setValue(tempStart);
            f.down("[name=" + pf.params.end + "]").setValue(tempEnd);
            me.processLembur(0, 1, 1);

        } else if (status === 4 || status === 5) { // hari libur
            var pf = me.getProcessField(0);
            var tempStart = f.down("[name=" + pf.params.start + "]").getValue();
            var tempEnd = f.down("[name=" + pf.params.end + "]").getValue();
            me.resetFieldsPelaksanaanLembur(1);
            me.resetFieldsPelaksanaanLembur(0);
            f.down("[name=" + pf.params.start + "]").setValue(tempStart);
            f.down("[name=" + pf.params.end + "]").setValue(tempEnd);
            me.processLembur(0, 0, 0);

        } else if (status === 3) { // keduanya (sebelum jam masuk dan setelah jam pulang)
            var pf1 = me.getProcessField(1);
            var pf2 = me.getProcessField(0);
            var tempStart = f.down("[name=" + pf1.params.start + "]").getValue();
            var tempEnd = f.down("[name=" + pf1.params.end + "]").getValue();
            var tempStart2 = f.down("[name=" + pf2.params.start + "]").getValue();
            var tempEnd2 = f.down("[name=" + pf2.params.end + "]").getValue();
            me.resetFieldsPelaksanaanLembur(1);
            me.resetFieldsPelaksanaanLembur(0);
            f.down("[name=" + pf1.params.start + "]").setValue(tempStart);
            f.down("[name=" + pf1.params.end + "]").setValue(tempEnd);
            f.down("[name=" + pf2.params.start + "]").setValue(tempStart2);
            f.down("[name=" + pf2.params.end + "]").setValue(tempEnd2);

            var hpl = me.processLembur(1, 1, 1, function(totalHour) {
                // return totalHour+hpl['totalHour'];
                return {
                    "min_hour": 0
                };
            });
            var total2 = me.processLembur(0, 1, 1, function(totalHour) {
                // return totalHour+hpl['totalHour'];
                return {
                    't': totalHour + hpl['totalHour'],
                    'b': hpl['breakTime'],
                    "status": "keduanya"
                };
            });


            // hapus info pelaksanaan lembur di sebelah kiri
            f.down("[name=" + pf1.totalHour.total + "]").setValue("");
            f.down("[name=" + pf1.totalHour.break + "]").setValue("");



            me.hitungFaktor(total2['totalHour'], 1, 1);

        }

        me.hitungSummary();

    },
    /* return total hour */
    processLembur: function(isLeft, isLeftFaktor, tipeLembur, callbackFunc) {
        var me = this;
        var totalHour = 0;
        if (!me.validShift || !me.myParams) {
            return false;
        }
        var statusLembur = false;
        var lebih24 = false;

        //var pf = me.getProcessField(1); // zona fields yang digunakan
        var pf = me.getProcessField(isLeft); // zona fields yang digunakan

        var f = me.getFormdata();

        var start = f.down("[name=" + pf.params.start + "]").getValue();
        var end = f.down("[name=" + pf.params.end + "]").getValue();

        /*
        if (!me.tools.timeLessThan(start, end)) {

            return false;
        }
        */


        var menitMin = me.myParams['minutes_limit_minimum'];
        var menitMax = me.myParams['minutes_limit_maximum'];



        
        
        
        /// cek jam lebih dari 24 jam 
        var lebihKecil = me.tools.timeLessThan(start,end);
        
        var statusLembur = f.down("[name=status]").getValue();
        var diffTime24 = false;
        var dd = false;
        
        if(statusLembur==1){ // sebelum jam masuk
            
            if(!lebihKecil){
                diffTime24 = me.tools.diffTime(start,'24:00:00');
                start = '00:00:00';
                lebih24 = true;
        
                end = me.tools.addTime(end,diffTime24);
            }
             dd = me.tools.diffTime(start, end);
        }else if(statusLembur==2 || statusLembur==4 || statusLembur==5){ // sesudah jam pulang
            if(!lebihKecil){
               
                //start = '00:00:00';
                var tempEnd = end;
                end = '24:00:00';
                
                lebih24 = true;
                
               // end = me.tools.addTime(end,diffTime24);
               dd = me.tools.diffTime(start, end);
               dd = me.tools.addTime(dd,tempEnd);
            }else{
                dd = me.tools.diffTime(start, end);
            }
        }else{
            dd = me.tools.diffTime(start, end);
        }


       

        /// set total jam decimal
        var his = dd.split(":");
        var h = his[0];
        var i = his[1];
        var s = his[2];

        //var netHour = me.tools.timeToDecimal(dd);
        var tempMenit = me.tools.intval(i);
        if (tempMenit >= menitMin && tempMenit <= menitMax) {
            tempMenit = 0.5;
        } else if (tempMenit > menitMax) {
            tempMenit = 1;
        } else {
            tempMenit = 0;
        }

        var netHour = me.tools.intval(h) + tempMenit;



        /// hitung istirahat
        var breakTime = 0;


        /// cek indeks lembur
        me.tempMatchIndeksLembur = null;
        var ils = me.localStore.indexLembur;
        ils.clearFilter(true);
        ils.filterBy(function(rec, id) {
            // filter berdasarkan tipe hari lembur off / hari biasa
            if (rec.raw.overtimetype === 1) {
                return true;
            } else {
                return false;
            }
        });

        var hi = me.hitungIstirahat(ils, netHour);
        breakTime = hi['b'];
        me.tempMatchIndeksLembur = hi['t'];

        /*
         var foundIndex = ils.findExact('hour',Math.floor(netHour));
         
         if (foundIndex > -1) {
         breakTime = me.tools.floatval(ils.getAt(foundIndex).get("cut_break"));
         me.tempMatchIndeksLembur = ils.getAt(foundIndex);
         }
         */




        var total = netHour - breakTime;


        //breaktime_cut_after


        var minHourGD = me.tools.timeToDecimal(me.myParams['general_day_after']);
        var minHourHD = me.tools.timeToDecimal(me.myParams['normal_holiday_after']);
        var minHour = me.shiftInfo['holyday'] > 0 ? minHourHD : minHourGD;


        minHour = minHourGD;


        // cek jika pake minimal hour
        if (typeof callbackFunc === 'function') {
            var params = callbackFunc(netHour);
            if (typeof params["min_hour"] !== "undefined") {
                minHour = params["min_hour"];
            }
        }

        /*
         if (tipeLembur === 1) { // hari biasa
         minHour = minHourGD;
         } else { // lainnya hari libur
         minHour = minHourHD;
         }
         */

        // khusus perhitungan untuk status keduanya
        var tnh = 0;
        if (typeof callbackFunc === 'function') {
            var tempHasil = 0;
            tempHasil = callbackFunc(netHour);
            //var hi2 = me.hitungIstirahat(ils, tempHasil['t']);
            //breakTime = hi2['b'];
            //breakTime = me.tools.floatval(breakTime) - me.tools.floatval(tempHasil['b']);
            //  total = tempHasil['t'] - breakTime;

            var status = tempHasil["status"];
            if (status === "keduanya") {
                var totalNetHour = me.tools.floatval(f.down("[name=before_net_hours]").getValue()) + netHour;
                tnh = totalNetHour;
                var bt = me.hitungIstirahat(ils, totalNetHour);
                breakTime = me.tools.floatval(bt["b"]);
                statusLembur = "keduanya";
                total = totalNetHour - breakTime;
            }

        }



        if (statusLembur === "keduanya") {
            /* cek jumlah jam minimum lembur */
            if (tnh >= minHour) {
                me.hitungFaktor(total, isLeft, isLeftFaktor);
                f.down("[name=" + pf.totalHour.duration + "]").setValue(dd);
                f.down("[name=" + pf.totalHour.net + "]").setValue(netHour);
                f.down("[name=" + pf.totalHour.total + "]").setValue(total);
                f.down("[name=" + pf.totalHour.break + "]").setValue(breakTime);
            } else {

                f.down("[name=" + pf.totalHour.duration + "]").setValue("");
                f.down("[name=" + pf.totalHour.net + "]").setValue("");
                f.down("[name=" + pf.totalHour.total + "]").setValue("");
                f.down("[name=" + pf.totalHour.break + "]").setValue("");

                me.tools.alert.warning("Jam lembur kurang dari " + minHour + " jam");
            }
        } else {
            /* cek jumlah jam minimum lembur */
            if (netHour >= minHour) {
                me.hitungFaktor(total, isLeft, isLeftFaktor);
                f.down("[name=" + pf.totalHour.duration + "]").setValue(dd);
                f.down("[name=" + pf.totalHour.net + "]").setValue(netHour);
                f.down("[name=" + pf.totalHour.total + "]").setValue(total);
                f.down("[name=" + pf.totalHour.break + "]").setValue(breakTime);
            } else {

                f.down("[name=" + pf.totalHour.duration + "]").setValue("");
                f.down("[name=" + pf.totalHour.net + "]").setValue("");
                f.down("[name=" + pf.totalHour.total + "]").setValue("");
                f.down("[name=" + pf.totalHour.break + "]").setValue("");

                me.tools.alert.warning("Jam lembur kurang dari " + minHour + " jam");
            }
        }








        totalHour = total;
        var hasil = {
            'totalHour': totalHour,
            'breakTime': breakTime
        };


        return hasil;



    },
    hitungIstirahat: function(ils, netHour) {
        var me = this;
        var hasil = {
            "t": null,
            "b": 0
        };
        var foundIndex = ils.findExact('hour', Math.floor(netHour));

        if (foundIndex > -1) {
            hasil['b'] = me.tools.floatval(ils.getAt(foundIndex).get("cut_break"));
            hasil['t'] = ils.getAt(foundIndex);
        }

        return hasil;

    },
    prosesFaktor: function(value, param, maxValue) {
        var me = this;
        var hasil = {
            "nilai": 0,
            "param": 0,
            "hasil": 0,
            "sisa": 0
        };
        if (maxValue > 0) {
            hasil["nilai"] = value >= maxValue ? maxValue : value;
        } else {
            hasil["nilai"] = value;
        }
        //   f1 = me.tools.floatval(me.myParams["normal_holiday_after"]);
        hasil["param"] = me.tools.floatval(param);
        hasil["hasil"] = hasil["nilai"] * hasil["param"];
        hasil["sisa"] = value - hasil["nilai"];
        return hasil;

    },
    hitungFaktor: function(totalHour, isLeft, isLeftFaktor) {
        var me = this;



        var f = me.getFormdata();

        var pf = me.getProcessField(isLeftFaktor); // zona fields yang digunakan

        var f1 = 0, f1p = 0, f1r = 0, f2 = 0, f2p = 0, f2r = 0, f3 = 0, f3p = 0, f3r = 0;

        var sisa = 0, hasil1 = false, hasil2 = false, hasil3 = false;

        sisa = totalHour;

        console.log(me.myParams);

        if (isLeftFaktor == 1) {


            hasil1 = me.prosesFaktor(sisa, me.myParams["general_day_factor_1"], 1);

            if (hasil1["sisa"] > 0) {
                hasil2 = me.prosesFaktor(hasil1["sisa"], me.myParams["general_day_factor_2"], 0);

            }

            /*
             f1 = 1;
             f1p = me.tools.floatval(me.myParams["general_day_factor_1"]);
             f1r = f1 * f1p;
             
             f2 = totalHour - f1;
             f2p = me.tools.floatval(me.myParams["general_day_factor_2"]);
             f2r = f2 * f2p;
             me.overtimeValue = f1r + f2r;
             */


        } else {

            var status = f.down("[name=status]").getValue();
            var maxF1 = status === 4 ? me.tools.timeToDecimal(me.myParams["normal_holiday_after"]) : me.tools.timeToDecimal(me.myParams["short_holiday_after"]);


            hasil1 = me.prosesFaktor(sisa, me.myParams["holiday_factor_1"], maxF1);

            if (hasil1["sisa"] > 0) {
                hasil2 = me.prosesFaktor(hasil1["sisa"], me.myParams["holiday_factor_2"], 1);
                if (hasil2["sisa"] > 0) {
                    hasil3 = me.prosesFaktor(hasil2["sisa"], me.myParams["holiday_factor_3"], 0);
                }
            }




        }

        me.overtimeValue = 0;

        if (hasil1) {
            f.down("[name=" + pf.faktor.satup + "]").setValue(hasil1["nilai"]);
            f.down("[name=" + pf.faktor.satuv + "]").setValue(hasil1["param"]);
            f.down("[name=" + pf.faktor.satuh + "]").setValue(hasil1["hasil"]);
            me.overtimeValue = hasil1["hasil"];
        }

        if (hasil2) {
            f.down("[name=" + pf.faktor.duap + "]").setValue(hasil2["nilai"]);
            f.down("[name=" + pf.faktor.duav + "]").setValue(hasil2["param"]);
            f.down("[name=" + pf.faktor.duah + "]").setValue(hasil2["hasil"]);
            me.overtimeValue = me.overtimeValue + hasil2["hasil"];
        }

        if (hasil3) {
            f.down("[name=" + pf.faktor.tigap + "]").setValue(hasil3["nilai"]);
            f.down("[name=" + pf.faktor.tigav + "]").setValue(hasil3["param"]);
            f.down("[name=" + pf.faktor.tigah + "]").setValue(hasil3["hasil"]);
            me.overtimeValue = me.overtimeValue + hasil3["hasil"];
        }







    },
    hitungSummary: function() {
        var me = this;
        var f = me.getFormdata();
        var extraMeal = 0;
        if (me.tempMatchIndeksLembur) {
            extraMeal = me.tempMatchIndeksLembur.get("meal");
        }
        f.down("[name=jam_kerja]").setValue(me.tools.diffTime(f.down("[name=in_time]").getValue(), f.down("[name=out_time]").getValue()));
        f.down("[name=nilai_lembur]").setValue(me.overtimeValue);
        f.down("[name=makan_extra]").setValue(extraMeal);
    },
    resetSummary: function() {
        var me = this;
        var f = me.getFormdata();

        f.down("[name=jam_kerja]").setValue("");
        f.down("[name=nilai_lembur]").setValue("");
        f.down("[name=makan_extra]").setValue("");
    },
    lookupEmployee: function() {
        var me = this;

        me.instantWindow("Panel", 600, "Employe List", "create", "employeewindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });



    },
    minicProc: function() {
        var me = this;
        var x = {
            lookupEmployee: {
                selectOnClick: function(rec) {
                    var f = me.getFormdata();
                    console.log(rec);

                    f.loadRecord(rec);
                    f.down("[name=employee_employee_nik]").setValue(rec.get("employee_nik"));
                    f.down("[name=employee_employee_name]").setValue(rec.get("employee_name"));
                    f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
                    me.dateOnChange();
                    me.timeOnBlur();

                }
            }
        };
        return x;

    },
    panelAfterRender: function(el) {
        var me = this;

        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');


        me.tools.ajax({
            params: {},
            success: function(data, model) {
                console.log(data);
                me.myParams = data['others'][1][0];

                //create index lembur store
                me.localStore.indexLembur = me.instantStore({
                    id: me.controllerName + 'IndexLemburStore',
                    idProperty: 'overtimeindex_id'
                });



                me.tools.wesea(data['overtimeindex'], me.localStore.indexLembur).instantStore();

                console.log(me.localStore.indexLembur.getAt(0));
            }
        }).read('parameter');

        me.getPanel().setLoading(false);

        // maximize panel window

    },
    validateData: function() {
        var me = this;
        var data = {"status": false, "msg": "Sedang diproses..."};
        if (me.validShift) {
            data.status = true;
        } else {
            data.msg = "Informasi shift tidak valid";
        }
        return data;
    },
    afterClick: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function() {
                //  me.mainGridCheckRecord();
                var rec = me.getGrid().getSelectedRecord();
                if (rec) {
                    f.loadRecord(rec);
                }
            },
            save: function() {

            },
            edit: function() {

            },
            delete: function() {

            },
            new : function() {
                me.validShift = false;
                f.getForm().reset();
                f.down("[name=date]").setValue(new Date());
            }
        }
        return x;
    }


});