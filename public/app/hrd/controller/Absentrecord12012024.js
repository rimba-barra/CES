Ext.define('Hrd.controller.Absentrecord', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Absentrecord',
    requires: [
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.absentrecord.Reason',
        'Hrd.minic.absentrecord.Onduty',
        'Hrd.library.box.tools.Util',
        'Hrd.minimodule.absent.ProcessAbsent',
        'Hrd.library.absentrecord.Tools',
        'Hrd.template.combobox.Checkedcombobox', //edited by ahmad riadi
        'Hrd.template.combobox.Statusovertimecombobox', //edited by ahmad riadi
        'Hrd.template.combobox.Overtimetiypeintranetcombobox', //edited by ahmad riadi
        'Hrd.template.combobox.Statuspdlkcombobox', //edited by ahmad riadi
        'Hrd.template.combobox.Fortransactioncombobox', //edited by ahmad riadi
    ],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'absentrecord',
    fieldName: 'periode',
    stores: [
        'Trainingperiode'
    ],
    formWidth: 900,
    uploadFotoKlik:0,
    refs: [
        {
            ref: 'formshift',
            selector: 'absentrecordformsetupshift'
        },
        {
            ref: 'gridemployee',
            selector: 'absentrecordemployeegrid'
        },
        {
            ref: 'form',
            selector: 'absentrecordformdata'
        },
        {
            ref: 'formonduty',
            selector: 'absentrecordformdataonduty'
        },
        {
            ref: 'formgen',
            selector: 'absentrecordformgeneratesheet'
        },
        {
            ref: 'panel',
            selector: 'absentrecordpanel'
        },
        {
            ref: 'formprocessabsent',
            selector: 'absentrecordformtoolprocessabsent'
        },
        {
            ref: 'formgenholiday',
            selector: 'absentrecordformemployeeoption'
        },
        {
            ref: 'formtransfer',
            selector: 'absentrecordformtooltransfer'
        },
        {
            ref: 'formlate',
            selector: 'absentrecordformtoolprocesslate'
        },
        {
            ref: 'formhal',
            selector: 'absentrecordformtoolprocesshourandlost'
        },
        {
            ref: 'formexcel',
            selector: 'absentrecordformtoolfileinput'
        },
        {
            ref: 'formreason',
            selector: 'absentrecordformreason'
        },
        {
            ref: 'formtlk',
            selector: 'absentrecordformtlk'
        },
        {
            ref: 'formtime',
            selector: 'absentrecordformtime'
        },
        {
            ref: 'formcutiber',
            selector: 'absentrecordformcutibersama'
        },
        {
            ref: 'gridcutibersama',
            selector: 'absentrecordemployeecutibersamagrid'
        },
        // added by Michael 2021.06.30 
        {
            ref: 'formcutitambahan',
            selector: 'absentrecordformcutitambahan'
        },
        {
            ref: 'gridcutitambahan',
            selector: 'absentrecordemployeecutitambahangrid'
        },
        {
            ref: 'gridlookupct',
            selector: 'lookupcutitambahangrid'
        },
        {
            ref: 'formsearchlookupct',
            selector: 'lookupcutitambahanformsearch'
        },
        {
            ref: 'gridlookupctv',
            selector: 'lookupcutitambahanviewgrid'
        },
        {
            ref: 'formsearchlookupctv',
            selector: 'lookupcutitambahanviewformsearch'
        },
        {
            ref: 'formcutitambahanview',
            selector: 'absentrecordformcutitambahanview'
        },
        {
            ref: 'gridcutitambahanview',
            selector: 'absentrecordemployeecutitambahangridview'
        },
        // end added by Michael 2021.06.30
        // added by Michael 2021.07.16 
        {
            ref: 'formsanksiketerlambatan',
            selector: 'absentrecordformsanksiketerlambatan'
        },
        {
            ref: 'gridsanksiketerlambatan',
            selector: 'absentrecordemployeesanksiketerlambatangrid'
        },
        {
            ref: 'gridlookupsk',
            selector: 'lookupsanksiketerlambatangrid'
        },
        {
            ref: 'formsearchlookupsk',
            selector: 'lookupsanksiketerlambatanformsearch'
        },
        {
            ref: 'gridlookupskv',
            selector: 'lookupsanksiketerlambatanviewgrid'
        },
        {
            ref: 'formsearchlookupskv',
            selector: 'lookupsanksiketerlambatanviewformsearch'
        },
        {
            ref: 'formsanksiketerlambatanview',
            selector: 'absentrecordformsanksiketerlambatanview'
        },
        {
            ref: 'gridsanksiketerlambatanview',
            selector: 'absentrecordemployeesanksiketerlambatangridview'
        },
        // end added by Michael 2021.07.16  
        {
            ref: 'gridjatahcuti',
            selector: 'absentrecordjcgrid'
        },
        {
            ref: 'gridinvalidabsent',
            selector: 'absentrecordemployeeiagrid'
        },
        {
            ref: 'forminvalidabsent',
            selector: 'absentrecordforminvalidabsent'
        },
        /* start added by ahmad riadi 06-04-2017 */
        {
            ref: 'gridcutiintranet',
            selector: 'absentrecordgridbrowseintranetcuti'
        },
        {
            ref: 'gridcutidetailintranet',
            selector: 'absentrecordgridintranetcutidetail'
        },
        {
            ref: 'gridijinintranet',
            selector: 'absentrecordgridbrowseintranetijin'
        },
        // added by Wulan 2021.07.07
        {
            ref: 'gridtukarshiftintranet',
            selector: 'absentrecordgridbrowseintranettukarshift'
        },
        // end added by Wulan 2021.07.07
        {
            ref: 'griddinasintranet',
            selector: 'absentrecordgridbrowseintranetdinas'
        },
        // added by Michael 2021.06.15 
        {
            ref: 'gridsakitintranet',
            selector: 'absentrecordgridbrowseintranetsakit'
        },
        // end added by Michael 2021.06.15 
        {
            ref: 'formtransferintranet',
            selector: 'absentrecordformtransferbyintranet'
        },
        {
            ref: 'formoptioncuti',
            selector: 'absentrecordformoptionscuti'
        },
        {
            ref: 'formoptionijin',
            selector: 'absentrecordformoptionsijin'
        },
        {
            ref: 'formoptiondinas',
            selector: 'absentrecordformoptionsdinas'
        },
        // added by Michael 2021.06.15 
        {
            ref: 'formoptionsakit',
            selector: 'absentrecordformoptionssakit'
        },
        // end added by Michael 2021.06.15
                
        // added by Wulan 2021.07.07
        {
            ref: 'formoptiontukarshift',
            selector: 'absentrecordformoptionstukarshift'
        },
        // end added by Wulan 2021.07.07
        {
            ref: 'formdataintranetcuti',
            selector: 'absentrecordformdataintranetcuti'
        },
        {
            ref: 'formdataintranetdinas',
            selector: 'absentrecordformdataintranetdinas'
        },
        // added by Michael 2021.06.15 
        {
            ref: 'formdataintranetsakit',
            selector: 'absentrecordformdataintranetsakit'
        },
        // end added by Michael 2021.06.15
        {
            ref: 'formdataintranetijin',
            selector: 'absentrecordformdataintranetijin'
        },
        {
            ref: 'formviewlog',
            selector: 'absentrecordformviewlog'
        },
        {
            ref: 'gridlog',
            selector: 'absentrecordgridviewlog'
        },
        {
            ref: 'gridabsentrecord',
            selector: 'absentrecordemployeegrid'
        },
        /* end added by ahmad riadi 06-04-2017 */

        //added by Michael 02/12/2021
        {
            ref: 'formviewalllog',
            selector: 'absentrecordformviewalllog'
        },
        {
            ref: 'gridalllog',
            selector: 'absentrecordgridviewalllog'
        },
        //end added by Michael 02/12/2021

        //added by Michael 16/12/2021
        {
            ref: 'formreminderabsensi',
            selector: 'absentrecordformreminderabsensi'
        },
        {
            ref: 'gridreminderabsensi',
            selector: 'absentrecordgridreminderabsensi'
        },
        //end added by Michael 16/12/2021

        /* start added by ahmad riadi 02-11-2017 */
        {
            ref: 'formoptiontukeroff',
            selector: 'absentrecordformoptionstukeroff'
        },
        {
            ref: 'formdatatukeroff',
            selector: 'absentrecordformdatatukeroff'
        },
        {
            ref: 'gridtukeroff',
            selector: 'absentrecordgridbrowsetukeroff'
        },
        /* end added by ahmad riadi 02-11-2017 */

        /* start added by ahmad riadi 06-11-2017 */
        {
            ref: 'formdatashift',
            selector: 'absentrecordformdatashift'
        },
        /* end added by ahmad riadi 06-11-2017 */




        /* start added by ahmad riadi 13-12-2017 */
        {
            ref: 'formworkgroup',
            selector: 'absentrecordformdataworkgroup'
        },
        /* end added by ahmad riadi 13-12-2017 */


        /* start added by ahmad riadi 14-12-2017 */
        {
            ref: 'formoptionpdlk',
            selector: 'absentrecordformoptionspdlk'
        },
        {
            ref: 'gridpdlk',
            selector: 'absentrecordgridbrowseintranetpdlk'
        },
        {
            ref: 'formdatapdlk',
            selector: 'absentrecordformdataintranetpdlk'
        },
        {
            ref: 'formoptionsovertime',
            selector: 'absentrecordformoptionsovertime'
        },
        {
            ref: 'gridovertime',
            selector: 'absentrecordGridbrowseintranetovertime'
        },
        /* end added by ahmad riadi 14-12-2017 */

        /* start added by ahmad riadi 09-03-2018 */
        {
            ref: 'formoptionsapi',
            selector: 'absentrecordformoptionsapi'
        },
        {
            ref: 'gridapi',
            selector: 'absentrecordgridbrowseapi'
        },
        /* end added by ahmad riadi 09-03-2018 */
        
        // added by wulan sari 20200616
        {
            ref: 'gridovertimedetail',
            selector: 'absentrecordovertimegrid'
        },
        {
            ref: 'formovertime',
            selector: 'absentrecordformovertime'
        },
        
        /*
        
        // added by wulan sari 20200828*/
        {
            ref: 'gridreasondetail',
            selector: 'absentrecordreasondetailgrid'
        },
        {
            ref: 'formreasondetail',
            selector: 'absentrecordformreasondetail'
        },
        
        //added by wulan 22 10 2021
        {
            ref: 'formdatashiftdetail',
            selector: 'absentrecordformdatashiftdetail'
        },
        {
            ref: 'gridshiftdetail',
            selector: 'absentrecordshiftdetailgrid'
        },
        // added by rico 11012024
        {
            ref: 'formcorrectionabsent',
            selector: 'absentrecordformcorrectionabsent'
        },
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Absentrecord',
    browseHandler: null,
    util: null,
    filterLoaded: {
        department: false,
        employeeList: false
    },
    localStore: {
        selectedUnit: null
    },
    currentFilter: {
        month: 0,
        dep: 0,
        year: 0,
        emIndex: -1,
        emId: 0
    },
    globalParams: {},
    fpnl: null, // buat nampung jumlah finger print absent sementara
    reasonDeleteClick: false,
    textCombos: [
        {
            textfieldName: 'absenttype_code',
            comboboxName: 'absenttype_id',
            formRef: 'absentrecordformdatareason',
            displayField: 'code'
        },
        {
            textfieldName: 'parametertlk_code',
            comboboxName: 'parametertlk_parametertlk_id',
            formRef: 'absentrecordformdataonduty',
            displayField: 'code'
        }
    ],
    atgcLeave: null, // ABSENTTYPEGROUPCODE_LEAVE
    //
    /* start added by ahmad riadi 10-04-2017*/
    rowintranetcuti: null,
    rowintranetijin: null,
    rowintranetdinas: null,
    // added by Michael 2021.06.15 
    rowintranetsakit: null,
    hrd_check_sakit: null,
    // end added by Michael 2021.06.15 
    rowtukeroff: null,
    rowintranetpdlk: null,
    rowabsentdetail: null,
    configintranet: null,
    absenttype_id_default: 0,
    hrd_check_cuti: null,
    hrd_check_ijin: null,
    hrd_check_dinas: null,
    hrd_check_pdlk: null,
    stores: [
        'Checked',
        'Statusovertime',
        'Overtimetiypeintranet',
        'Statuspdlk',
        'Transactionapitype',
    ],
    /* end added by ahmad riadi 10-04-2017*/
    constructor: function (configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        me.registerMiniCtrl('reason', new Hrd.minic.absentrecord.Reason({
            controllerName: 'Absentrecord'
        }));
        me.registerMiniCtrl('onduty', new Hrd.minic.absentrecord.Onduty({
            controllerName: 'Absentrecord'
        }));
        this.callParent(arguments);
        Ext.tip.QuickTipManager.init();

        // event untuk single klik di grid
        if (typeof gbAbsentRecord === 'undefined') {
            gbAbsentRecord = {
                reasonClick: function (index) {
                    me.gridReasonItemClick(index);
                },
                tlkClick: function (index) {
                    me.gridTlkItemClick(index);
                },
                timeClick: function (index, dataIndex) {
                    //udpated by anas 16102023 | DICOMMENT supaya tidak bisa klik untuk ubah jam absen
                    // me.gridTimeItemClick(index);
                    me.gridTimePopup(index, dataIndex);
                },
                columnSheetclick: function (index) {
                    me.showformShiftinclick(index);
                },
                // added by wulan sari 20200616
                statuslemburClick: function (index) {
                    me.gridStatusLemburClick(index);
                },
                // added by wulan sari 20211022
                columnSheetdayclick: function (index) {
                    me.showformShiftdetailinclick(index);
                },
            };
        }


        //  me.reason = new Hrd.model.absentrecord.Reason();
    },
    alreadyInitStatus: false,
    init: function () {

        this.callParent(arguments);
        var me = this;

        if (me.alreadyInitStatus) {
            return;
        }
        me.alreadyInitStatus = true;


        var events = new Hrd.library.box.tools.EventSelector();
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.util = new Hrd.library.box.tools.Util();
        var processAbsent = new Hrd.minimodule.absent.ProcessAbsent({
            controllerName: me.bindPrefixName
        });



        this.control(events.getEvents(me, me.controllerName));


        var hourObjects = ['time_in', 'time_out'];
        for (var x in hourObjects) {
            this.control(events.timeInput('absentrecordformtime', me.tools.inputHoursObjects(hourObjects[x])));

        }



        /* added 27 Agustus */
        var hourObjects = ['timein', 'timeout'];
        for (var x in hourObjects) {
            this.control(events.timeInput('absentrecordformdata', me.tools.inputHoursObjects(hourObjects[x])));

        }

        var newEvs = {};




        newEvs['absentrecordgrid toolbar button[action=generate]'] = {
            click: me.generateSheet
        };

        newEvs['absentrecordformsetupshift'] = {
            afterrender: me.shift().fdar
        };
        newEvs['absentrecordgrid toolbar button[action=setupshift]'] = {
            click: me.shift().winShow
        };
        // tool delete
        newEvs['absentrecordgrid toolbar button[action=delete]'] = {
            click: function () {
                me.toolDelete().form();
            }
        };
        newEvs['absentrecordformtooldelete button[action=delete]'] = {
            click: function (el) {
                me.toolDelete().confirm(el);
            }
        };
        //


        // setup shift
        newEvs['absentrecordformsetupshift button[action=save]'] = {
            click: me.shift().insertToSheet
        };
        newEvs['absentrecordformsetupshift [name=shifttype_id]'] = {
            change: me.shift().comboOnChange
        };
        newEvs['absentrecordformsetupshift button[action=genholiday]'] = {
            click: me.shift().genHoliday
        };

        newEvs['#MyAbsentGrid button[action=processlate]'] = {
            click: function (el) {


                me.toolProcessLate().form();
            }
        };



        newEvs['absentrecordgrid toolbar button[action=transfer]'] = {
            click: function (el) {
                me.toolTransfer().form();
            }
        };

        newEvs['absentrecordgrid toolbar button[action=processjklt]'] = {
            click: function (el) {
                me.toolTotalHourandLost().form();
            }
        };


        newEvs['absentrecordgrid toolbar button[action=processday]'] = {
            click: function (el) {
                me.toolProcessDay().process();
            }
        };

        newEvs['absentrecordgrid toolbar button[action=importexcel]'] = {
            click: function (el) {
                me.toolExcel().form();
            }
        };

        newEvs['absentrecordformemployeeoption button[action=process]'] = {
            click: me.shift().genHolidayProcess
        };
        newEvs['absentrecordemployeegrid'] = {
            afterrender: me.emGrid().fdar,
            itemdblclick: me.emGrid().select,
            selectionchange: me.emGrid().select
        };
        newEvs['absentrecordformdata button[action=reason]'] = {
            click: me.showFormReason
        };
        newEvs['absentrecordformdata button[action=onduty]'] = {
            click: me.showFormOnduty
        };
        newEvs['absentrecordformsearch [name=search_department_id]'] = {
            select: function () {
                me.storeFilter();
                me.filterEmployeeList();
            }
        };
        
        // added by Wulan Sari 25.04.2018
        newEvs['absentrecordformsearch [name=search_kelompokabsensi_id]'] = {
            select: function () {

                me.filterEmployeeList();
            }
        };
        

        newEvs['absentrecordformsearch [name=year_pick]'] = {
            //change: me.resetGrid
            select: function () {
                me.storeFilter();
                me.yearPickOnChange();
            }
        };
        newEvs['absentrecordformsearch [name=month_pick]'] = {
            //change: me.resetGrid
            select: function () {
                me.storeFilter();
                me.monthPickOnChange();
            }
        };

        // added by Michael 2021.05.19 
        newEvs['absentrecordformsearch [name=search_projectpt_id]'] = {
            //change: me.resetGrid
            select: function () {
                me.projectptFilter();
            }
        };
        // end added by Michael 2021.05.19 

        newEvs['absentrecordformgeneratesheet button[action=continue]'] = {
            //change: me.resetGrid
            click: me.continueOnClick
        };
        newEvs['absentrecordformtooltransfer button[action=process]'] = {
            //change: me.resetGrid
            click: function (el) {
                me.toolTransfer().processOnClick();
            }

        };

        newEvs['absentrecordformtoolprocesslate button[action=process]'] = {
            click: function (el) {
                me.toolProcessLate().processOnClick();
            }

        };

        newEvs['absentrecordformtoolprocesshourandlost button[action=process]'] = {
            click: function (el) {
                me.toolTotalHourandLost().processOnClick();
            }

        };

        newEvs['absentrecordformtoolfileinput #fd_file'] = {
            change: function (fld, a) {
                me.toolExcel().fileOnChange();
            }

        };
        newEvs['absentrecordformreason checkbox[name=is_cuti]'] = {
            change: me.isCutiChange
        };

        newEvs['absentrecordformreason button[action=process]'] = {
            click: function (el) {
                console.log(el);
                me.reasonProcessOnClick();
            }
        };

        newEvs['absentrecordformtlk button[action=process]'] = {
            click: function () {
                me.tlkProcessOnClick();
            }
        };

        newEvs['absentrecordformcorrectionabsent button[action=process]'] = { // added by rico 12012024
            click: function () {
                me.correctionAbsentProcessOnClick();
            }
        };

        newEvs['absentrecordformtime button[action=process]'] = {
            click: function () {
                me.timeProcessOnClickAbsRec();
            }
        };

        newEvs['absentrecordgrid toolbar button[action=fixdate]'] = {
            click: function (el) {
                me.fixDate();
            }
        };
        newEvs['absentrecordformsetupshift button[action=shiftexcel]'] = {
            click: function () {
                me.showShifExcelForm();
            }
        };

        newEvs['absentrecordformshiftexcel #file_shiftexcel'] = {
            change: function (fld, a) {
                me.formShiftExcelUpload(fld, a, 'mode');
            }
        };

        newEvs['absentrecordformshiftexcel button[action=download_template]'] = {
            click: function () {
                me.downloadTemplate();
            }
        };

        newEvs['absentrecordformtooltransfer #file_csvabsent'] = {
            change: function (fld, a) {
                me.formAbsentCsvUpload(fld, a, 'mode');
            }
        };

        newEvs['absentrecordformtooltransfer #modeTransferID'] = {
            change: function (fld, a) {
                me.modeTransferOnSelect();
            }
        };


        newEvs['absentrecordgrid toolbar button[action=cutibersama]'] = {
            click: function (el) {
                me.toolCutiBersama().showForm();
            }
        };
        newEvs['absentrecordformcutibersama [action=process]'] = {
            click: function (el) {
                me.toolCutiBersama().proses();
            }
        };
        newEvs['absentrecordemployeecutibersamagrid toolbar [action=destroy]'] = {
            click: function (el) {
                me.toolCutiBersama().removeEmployee();
            }
        };

        // added by Michael 2021.06.30 
        newEvs['absentrecordgrid toolbar button[action=cutitambahan]'] = {
            click: function (el) {
                me.toolCutiTambahan().showForm();
            }
        };
        newEvs['absentrecordformcutitambahan [action=process]'] = {
            click: function (el) {
                me.toolCutiTambahan().proses();
            }
        };
        newEvs['absentrecordformcutitambahan [action=cancel]'] = {
            click: function (el) {
                me.toolCutiTambahan().cancel();
            }
        };
        newEvs['absentrecordformcutitambahan [action=view]'] = {
            click: function (el) {
                me.toolCutiTambahan().view();
            }
        };
        newEvs['absentrecordemployeecutitambahangrid toolbar [action=destroy]'] = {
            click: function (el) {
                me.toolCutiTambahan().removeEmployee();
            }
        };
        newEvs['absentrecordemployeecutitambahangrid toolbar [action=add]'] = {
            click: function (el) {
                me.toolCutiTambahan().addEmployee();
            }
        };

        newEvs['lookupcutitambahanformsearch'] = {
            afterrender: function () {
                var me,form;
                me = this;
                var fs = me.getFormsearch();
                var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                f = me.getFormsearchlookupct();
                me.tools.ajax({
                        params: {
                            'projectptid_opsi':projectptid_opsi
                        },
                        success: function(data, model) {
                                me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                        }
                }).read('parameter');
                
            },

        };

        newEvs['lookupcutitambahanformsearch button[action=search]'] = {
            click: function () {
                this.lookupEmployee();
            }
        };
        newEvs['lookupcutitambahanformsearch button[action=reset]'] = {
            click: function () {
               form = me.getFormsearchlookupct().getForm().reset();
               this.lookupEmployee();
            }
        };
        newEvs['lookupcutitambahangrid button[action=select]'] = {
            click: function () {
                me.selectEmployee();
            }
        };
        newEvs['lookupcutitambahanviewformsearch'] = {
            afterrender: function () {
                var me,form;
                me = this;
                var fs = me.getFormsearch();
                var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                f = me.getFormsearchlookupctv();
                // me.tools.ajax({
                //         params: {
                //             'projectptid_opsi':projectptid_opsi
                //         },
                //         success: function(data, model) {
                //                 me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                //         }
                // }).read('parameter');
                
            },

        };

        newEvs['lookupcutitambahanviewformsearch button[action=search]'] = {
            click: function () {
                this.lookupViewlog();
            }
        };
        newEvs['lookupcutitambahanviewformsearch button[action=reset]'] = {
            click: function () {
               form = me.getFormsearchlookupctv().getForm().reset();
               this.lookupViewlog();
            }
        };

        newEvs['lookupcutitambahanviewgrid button[action=viewproses]'] = {
            click: function () {
                this.viewemployeeViewlog();
            }
        };

        newEvs['lookupcutitambahanviewgrid button[action=editproses]'] = {
            click: function () {
                this.editprosesViewlog();
            }
        };

        newEvs['lookupcutitambahanviewgrid button[action=cancelproses]'] = {
            click: function () {
                this.cancelprosesViewlog();
            }
        };
        
        // end added by Michael 2021.06.30 

        // added by Michael 2021.07.16 
        newEvs['absentrecordgrid toolbar button[action=sanksiketerlambatan]'] = {
            click: function (el) {
                me.toolSanksiKeterlambatan().showForm();
            }
        };
        newEvs['absentrecordformsanksiketerlambatan [action=process]'] = {
            click: function (el) {
                me.toolSanksiKeterlambatan().proses();
            }
        };
        newEvs['absentrecordformsanksiketerlambatan [name=periode_month]'] = {
            change: function (el) {
                me.descriptionSanksiKeterlambatan();
            }
        };
        newEvs['absentrecordformsanksiketerlambatan [name=periode]'] = {
            change: function (el) {
                me.descriptionSanksiKeterlambatan();
            }
        };
        newEvs['absentrecordformsanksiketerlambatan [action=cancel]'] = {
            click: function (el) {
                me.toolSanksiKeterlambatan().cancel();
            }
        };
        newEvs['absentrecordformsanksiketerlambatan [action=view]'] = {
            click: function (el) {
                me.toolSanksiKeterlambatan().view();
            }
        };
        newEvs['absentrecordemployeesanksiketerlambatangrid toolbar [action=destroy]'] = {
            click: function (el) {
                me.toolSanksiKeterlambatan().removeEmployee();
            }
        };
        newEvs['absentrecordemployeesanksiketerlambatangrid toolbar [action=add]'] = {
            click: function (el) {
                me.toolSanksiKeterlambatan().addEmployee();
            }
        };

        newEvs['lookupsanksiketerlambatanformsearch'] = {
            afterrender: function () {
                var me,form;
                me = this;
                var fs = me.getFormsearch();
                var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                f = me.getFormsearchlookupsk();
                me.tools.ajax({
                        params: {
                            'projectptid_opsi':projectptid_opsi
                        },
                        success: function(data, model) {
                                me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                        }
                }).read('parameter_sanksiketerlambatan');
                
            },

        };

        newEvs['lookupsanksiketerlambatanformsearch button[action=search]'] = {
            click: function () {
                this.lookupEmployeeSanksiKeterlambatan();
            }
        };
        newEvs['lookupsanksiketerlambatanformsearch button[action=reset]'] = {
            click: function () {
               form = me.getFormsearchlookupsk().getForm().reset();
               this.lookupEmployeeSanksiKeterlambatan();
            }
        };
        newEvs['lookupsanksiketerlambatangrid button[action=select]'] = {
            click: function () {
                me.selectEmployeeSanksiKeterlambatan();
            }
        };
        newEvs['lookupsanksiketerlambatanviewformsearch'] = {
            afterrender: function () {
                var me,form;
                me = this;
                var fs = me.getFormsearch();
                var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                f = me.getFormsearchlookupskv();
                
            },

        };

        newEvs['lookupsanksiketerlambatanviewformsearch button[action=search]'] = {
            click: function () {
                this.lookupViewlogSanksiKeterlambatan();
            }
        };
        newEvs['lookupsanksiketerlambatanviewformsearch button[action=reset]'] = {
            click: function () {
               form = me.getFormsearchlookupskv().getForm().reset();
               this.lookupViewlogSanksiKeterlambatan();
            }
        };

        newEvs['lookupsanksiketerlambatanviewgrid button[action=viewproses]'] = {
            click: function () {
                this.viewemployeeViewlogSanksiKeterlambatan();
            }
        };

        newEvs['lookupsanksiketerlambatanviewgrid button[action=editproses]'] = {
            click: function () {
                this.editprosesViewlogSanksiKeterlambatan();
            }
        };

        newEvs['lookupsanksiketerlambatanviewgrid button[action=cancelproses]'] = {
            click: function () {
                this.cancelprosesViewlogSanksiKeterlambatan();
            }
        };
        // end added by Michael 2021.07.16 

        newEvs['absentrecordformsetupshift  button[action=clear_selection]'] = {
            click: function (el) {
                me.setupShiftClearSelection();
            }
        };        
        
        // added by Wulan sari 2018.04.26
        newEvs['absentrecordformsearch [name=pilihan_filter]'] = {
            change: function () {                
                var fs = me.getFormsearch();        
                var vs = fs.getValues();    
                pilihan_filter = vs["pilihan_filter"];
                console.log(pilihan_filter)
                if(pilihan_filter == 'department'){
                    
                    fs.down("[name=search_department_id]").show(); 
                    var el = fs.down("[name=search_department_id]");
                    var ds = el.getStore();
                    ds.clearFilter(true);
                    if (ds.getCount() > 0) {
                        var highDepartment = ds.getAt(ds.getCount() - 1).get('department_id');
                        el.setValue(highDepartment);
                        el.fireEvent("select");
                    }
                    
                    fs.down("[name=search_kelompokabsensi_id]").hide(); 
                    fs.down("[name=search_kelompokabsensi_id]").setValue();                    
                } else {
                    fs.down("[name=search_department_id]").hide(); 
                    fs.down("[name=search_department_id]").setValue(); 
                    fs.down("[name=search_kelompokabsensi_id]").show();   
                    var el = fs.down("[name=search_kelompokabsensi_id]");
                    var ds = el.getStore();
                    ds.clearFilter(true);
                    if (ds.getCount() > 0) {
                        var highId = ds.getAt(0).get('kelompokabsensi_id');
                        el.setValue(highId);
                        el.fireEvent("select");
                    }
                }
            }
        };
        // end by Wulan sari 2018.04.26
        
        
        ///////// setuh shift check box
        newEvs['absentrecordformsetupshift  [name=day_101]'] = {
            change: function (el) {
                me.setupShiftCheckAll(1);
            }
        };
        newEvs['absentrecordformsetupshift  [name=day_102]'] = {
            change: function (el) {
                me.setupShiftCheckAll(2);
            }
        };
        newEvs['absentrecordformsetupshift  [name=day_103]'] = {
            change: function (el) {
                me.setupShiftCheckAll(3);
            }
        };
        newEvs['absentrecordformsetupshift  [name=day_104]'] = {
            change: function (el) {
                me.setupShiftCheckAll(4);
            }
        };
        newEvs['absentrecordformsetupshift  [name=day_105]'] = {
            change: function (el) {
                me.setupShiftCheckAll(5);
            }
        };
        newEvs['absentrecordformsetupshift  [name=day_106]'] = {
            change: function (el) {
                me.setupShiftCheckAll(6);
            }
        };
        newEvs['absentrecordformsetupshift  [name=day_107]'] = {
            change: function (el) {
                me.setupShiftCheckAll(7);
            }
        };

        newEvs['absentrecordformreason button[action=deletereason]'] = {
            click: function () {
                me.reasonDeleteOnClick();
            }
        };
        
        // added by wulan sari 20200828
        newEvs['absentrecordformreason button[action=detailreason]'] = {
            click: function () {
                me.reasonDetailOnClick();
            }
        };
        // end added by wulan sari 20200828

        newEvs['absentrecordgrid button[action=invalidabsent]'] = {
            click: function () {
                me.invalidabsentOnClick();
            }
        };

        newEvs['absentrecordforminvalidabsent button[action=cari]'] = {
            click: function () {
                me.cariInvalidObjectOnClick();
            }
        };
        newEvs['absentrecordforminvalidabsent [name=select_all]'] = {
            change: function () {
                me.invalidAbsentPilihSemuaOnCheck();
            }
        };
        newEvs['absentrecordforminvalidabsent button[action=send_mail]'] = {
            click: function () {
                me.invalidAbsentSendMailOnClick();
            }
        };
        newEvs['absentrecordforminvalidabsent [name=department_id]'] = {
            blur: function () {
                me.invalidAbsentDptOnBlur();
            }
        };
        newEvs['absentrecordformcutibersama [name=start_date]'] = {
            change: function () {
                me.fcbStartDateOnBlur();
            }
        };
        newEvs['absentrecordformcutibersama [name=end_date]'] = {
            change: function () {
                me.fcbEndDateOnBlur();
            }
        };
        
        //added by Michael 16/12/2021
        newEvs['absentrecordgrid toolbar button[action=reminderabsensi]'] = {
            click: function () {
                var me;
                me = this;
                me.Formreminderabsensishow();
            }
        };
        newEvs['absentrecordformreminderabsensi'] = {
            afterrender: function () {
                var me;
                me = this;
                me.FromreminderabsensiAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDatareminderabsensi();
            }
        };
        newEvs['absentrecordformreminderabsensi button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getDatareminderabsensi();
            }
        };
        newEvs['absentrecordformreminderabsensi button[action=cleardata]'] = {
            click: function () {
                var me, form, dates;
                me = this;
                form = me.getFormreminderabsensi();
                form.getForm().reset();
                dates = me.getStartEnddatecurmonth();
                form.down('[name=fromdate]').setValue(dates.fromdate);
                form.down('[name=untildate]').setValue(dates.untildate);
                me.getDatareminderabsensi();
            }

        };

        newEvs['absentrecordformreminderabsensi button[action=process_sendemailciputra]'] = {
            click: function () {
                var me, form, dates;
                me = this;
                me.sendEmailCiputra();
            }

        };

        newEvs['absentrecordformreminderabsensi button[action=process_sendemailgeneral]'] = {
            click: function () {
                var me, form, dates;
                me = this;
                me.sendEmailGeneral();
            }

        };
        //end added by Michael 16/12/2021
        
        /* start added by ahmad riadi 06-04-2017 */
        newEvs['absentrecordgrid toolbar button[action=transferbyintranet]'] = {
            click: function () {
                var me;
                me = this;
                me.showFormOptionintranet();
            }
        };
        newEvs['absentrecordgrid toolbar button[action=viewlog]'] = {
            click: function () {
                var me;
                me = this;
                me.Formviewlogshow();
            }
        };
        newEvs['absentrecordgridbrowseintranetcuti actioncolumn'] = {
            click: this.gridIntranetCutiActionColumnClick
        }
        newEvs['absentrecordgridbrowseintranetijin actioncolumn'] = {
            click: this.gridIntranetIjinActionColumnClick
        }
        newEvs['absentrecordgridbrowseintranetdinas actioncolumn'] = {
            click: this.gridIntranetDinasActionColumnClick
        }
        // added by Michael 2021.06.15 
        newEvs['absentrecordgridbrowseintranetsakit actioncolumn'] = {
            click: this.gridIntranetSakitActionColumnClick
        }
        // end added by Michael 2021.06.15 
        newEvs['absentrecordformoptionscuti button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterdatacuti();
            }
        };
        newEvs['absentrecordformoptionscuti button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormoptioncuti().getForm().reset();
                me.getDatacutiintranet();
            }

        };

        newEvs['absentrecordformoptionsijin button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterdataijin();
            }
        };
        newEvs['absentrecordformoptionsijin button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormoptionijin().getForm().reset();
                me.getDataijinintranet();
            }

        };
        newEvs['absentrecordformoptionsdinas button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterdatadinas();
            }
        };
        newEvs['absentrecordformoptionsdinas button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormoptiondinas().getForm().reset();
                me.getDatadinasintranet();
            }

        };
        // added by Michael 2021.06.15 
        newEvs['absentrecordformoptionssakit button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterdatasakit();
            }
        };
        newEvs['absentrecordformoptionssakit button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormoptionsakit().getForm().reset();
                me.getDatasakitintranet();
            }

        };
        // added by Michael 2021.06.15 
        
        // added by Wulan 2021.07.07
        newEvs['absentrecordformoptionstukarshift button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterdatatukarshift();
            }
        };
        newEvs['absentrecordformoptionstukarshift button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormoptiontukarshift().getForm().reset();
                me.getDatatukarshiftintranet();
            }

        };
        // added by Wulan 2021.07.07
        
        newEvs['absentrecordformtransferbyintranet button[action=process]'] = {
            click: function () {
                me.routeGrid();
            }
        };
        newEvs['absentrecordformoptionscuti'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formOptionsCutiAfterrender();
            },
            boxready: function () {
                var me, form;
                me = this;
                me.getDatacutiintranet();
            }
        };
        newEvs['absentrecordformoptionsijin'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formOptionsIjinAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDataijinintranet();
            }
        };
        newEvs['absentrecordformoptionsdinas'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formOptionsDinasAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDatadinasintranet();
            }
        };

        // added by Michael 2021.06.15 
        newEvs['absentrecordformoptionssakit'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formOptionsSakitAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDatasakitintranet();
            }
        };
        // end added by Michael 2021.06.15 


        // added by Wulan 2021.07.07
        newEvs['absentrecordformoptionstukarshift'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formOptionsTukarshiftAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDatatukarshiftintranet();
            }
        };
        // end added by Wulan 2021.07.07


        newEvs['absentrecordformdataintranetcuti'] = {
            afterrender: function () {
                var me, form;
                me = this;
                me.formDataCutiAfterrender();
            },
        };
        newEvs['absentrecordformdataintranetcuti [name=absenttype_id]'] = {
            change: function (that, newValue, oldValue, eOpt) {
                var me, form;
                me = this;
                form = me.getFormdataintranetcuti();
                if (me.hrd_check_cuti !== 'YES') {
                    if (newValue !== me.absenttype_id_default) {
                        form.down("[name=sendmail]").setValue(true);
                    } else {
                        form.down("[name=sendmail]").setValue(false);
                    }
                }

            },
        };
        newEvs['absentrecordformdataintranetcuti [name=hrd_comment]'] = {
            blur: function (that, The, eOpts) {
                var me, form, hrd_comment, counter_hrd_comment;
                me = this;
                form = me.getFormdataintranetcuti();
                hrd_comment = form.down("[name=hrd_comment]").getValue();
                counter_hrd_comment = hrd_comment.length;
                if (me.hrd_check_ijin !== 'YES') {
                    if (counter_hrd_comment > 0) {
                        form.down("[name=sendmail]").setValue(true);
                    } else {
                        form.down("[name=sendmail]").setValue(false);
                    }
                }

            },
        };
        newEvs['absentrecordformdataintranetijin'] = {
            afterrender: function () {
                var me, form;
                me = this;
                me.formDataIjinAfterrender();
            },
        };
        newEvs['absentrecordformdataintranetijin [name=hrd_comment]'] = {
            blur: function (that, The, eOpts) {
                var me, form, hrd_comment, counter_hrd_comment;
                me = this;
                form = me.getFormdataintranetijin();
                hrd_comment = form.down("[name=hrd_comment]").getValue();
                counter_hrd_comment = hrd_comment.length;

                if (me.hrd_check_ijin !== 'YES') {
                    if (counter_hrd_comment > 0) {
                        form.down("[name=sendmail]").setValue(true);
                    } else {
                        form.down("[name=sendmail]").setValue(false);
                    }
                }

            },
        };
        newEvs['absentrecordformdataintranetdinas'] = {
            afterrender: function () {
                var me, form;
                me = this;
                me.formDataDinasAfterrender();
            },
        };
        newEvs['absentrecordformdataintranetdinas [name=hrd_comment]'] = {
            blur: function (that, The, eOpts) {
                var me, form, hrd_comment, counter_hrd_comment;
                me = this;
                form = me.getFormdataintranetdinas();
                hrd_comment = form.down("[name=hrd_comment]").getValue();
                counter_hrd_comment = hrd_comment.length;

                if (me.hrd_check_dinas !== 'YES') {
                    if (counter_hrd_comment > 0) {
                        form.down("[name=sendmail]").setValue(true);
                    } else {
                        form.down("[name=sendmail]").setValue(false);
                    }
                }

            },
        };
        // added by Michael 2021.06.15 
        newEvs['absentrecordformdataintranetsakit'] = {
            afterrender: function () {
                var me, form;
                me = this;
                me.formDataSakitAfterrender();
            },
        };
        newEvs['absentrecordformdataintranetsakit [name=hrd_comment]'] = {
            blur: function (that, The, eOpts) {
                var me, form, hrd_comment, counter_hrd_comment;
                me = this;
                form = me.getFormdataintranetsakit();
                hrd_comment = form.down("[name=hrd_comment]").getValue();
                counter_hrd_comment = hrd_comment.length;

                if (me.hrd_check_sakit !== 'YES') {
                    if (counter_hrd_comment > 0) {
                        form.down("[name=sendmail]").setValue(true);
                    } else {
                        form.down("[name=sendmail]").setValue(false);
                    }
                }

            },
        };
        newEvs['absentrecordformdataintranetsakit [action=view_file_sakit]'] = {
            click: function(el, val) {
                me.viewFile();    
            }

        };
        //added by michael 16/11/2021
        newEvs['absentrecordformdataintranetcuti [action=view_file_cuti]'] = {
            click: function(el, val) {
                me.viewFileCuti();    
            }

        };
        newEvs['absentrecordformreason [action=view_file_intranet_cuti]'] = {
            click: function(el, val) {
                me.viewFileReasonCuti();    
            }

        };
        //end added by michael 16/11/2021
        newEvs['absentrecordformreason [action=view_file_intranet]'] = {
            click: function(el, val) {
                me.viewFileReason();    
            }

        };
        newEvs['absentrecordformreason [name=file_name_upload]'] = {
            change: function(fld, a) {

                me.formUploadFoto(fld, a, 'mode');
            }
        };
        // end added by Michael 2021.06.15 
        
        //start added by Wulan 2021.07.07 
        newEvs['absentrecordformdataintranettukarshift'] = {
            afterrender: function () {
                var me, form;
                me = this;
                me.formDataTukarshiftAfterrender();
            },
        };
        newEvs['absentrecordformdataintranettukarshift [name=hrd_comment]'] = {
            blur: function (that, The, eOpts) {
                var me, form, hrd_comment, counter_hrd_comment;
                me = this;
                form = me.getFormdataintranettukarshift();
                hrd_comment = form.down("[name=hrd_comment]").getValue();
                counter_hrd_comment = hrd_comment.length;

                if (me.hrd_check_tukarshift !== 'YES') {
                    if (counter_hrd_comment > 0) {
                        form.down("[name=sendmail]").setValue(true);
                    } else {
                        form.down("[name=sendmail]").setValue(false);
                    }
                }

            },
        };
        newEvs['absentrecordformoptionstukarshift button[action=process]'] = {
            click: this.SaveIntranettukarshiftToCES
        };
        newEvs['absentrecordformdataintranetshift button[action=save]'] = {
            click: this.saveIntranetTukarshifttoStore
        };
        //start added by Wulan 2021.07.07
        
        newEvs['absentrecordformdataintranetcuti button[action=save]'] = {
            click: this.saveIntranetCutitoStore
        };
        newEvs['absentrecordformoptionscuti button[action=process]'] = {
            click: this.SaveIntranetcutiToCES
        };
        newEvs['absentrecordformoptionsijin button[action=process]'] = {
            click: this.SaveIntranetijinToCES
        };
        newEvs['absentrecordformdataintranetijin button[action=save]'] = {
            click: this.saveIntranetIjintoStore
        };
        newEvs['absentrecordformoptionsdinas button[action=process]'] = {
            click: this.SaveIntranetdinasToCES
        };
        newEvs['absentrecordformdataintranetdinas button[action=save]'] = {
            click: this.saveIntranetDinastoStore
        };
        // added by Michael 2021.06.15 
        newEvs['absentrecordformoptionssakit button[action=process]'] = {
            click: this.SaveIntranetsakitToCES
        };
        newEvs['absentrecordformdataintranetsakit button[action=save]'] = {
            click: this.saveIntranetSakittoStore
        };
        // end added by Michael 2021.06.15 
        newEvs['absentrecordformviewlog'] = {
            afterrender: function () {
                var me;
                me = this;
                me.FromviewLogAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDataviewlog();
            }
        };
        newEvs['absentrecordformviewlog button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getDataviewlog();
            }
        };
        newEvs['absentrecordformviewlog button[action=cleardata]'] = {
            click: function () {
                var me, form, dates;
                me = this;
                form = me.getFormviewlog();
                form.getForm().reset();
                dates = me.getStartEnddatecurmonth();
                form.down('[name=fromdate]').setValue(dates.fromdate);
                form.down('[name=untildate]').setValue(dates.untildate);
                me.getDataviewlog();
            }

        };

        /* end added by ahmad riadi 06-04-2017 */
        //added by michael 02/12/2021
        newEvs['absentrecordformviewlog button[action=viewalllogdata]'] = {
            click: function () {
                var me;
                me = this;
                me.Formviewalllogshow();
            }
        };
        newEvs['absentrecordformviewalllog'] = {
            boxready: function () {
                var me;
                me = this;
                me.getDataviewalllog();
            }
        };
        //end added by michael 02/12/2021

        /* start added by ahmad riadi 01-11-2017 */
        newEvs['absentrecordgridbrowsetukeroff'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formOptionsTukeroffAfterrender();
            },
            boxready: function () {
                var me, form;
                me = this;
                me.getDatatukeroff();
            }
        };
        newEvs['absentrecordformdatatukeroff'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formDataTukerOffAfterrender();
            },
        };

        newEvs['absentrecordgridbrowsetukeroff actioncolumn'] = {
            click: this.gridtukeroffActionColumnClick
        };

        newEvs['absentrecordformoptionstukeroff button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterdatatukeroff();
            }
        };
        newEvs['absentrecordformoptionstukeroff button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormoptiontukeroff().getForm().reset();
                me.getDatatukeroff();
            }

        };
        newEvs['absentrecordformdatatukeroff button[action=save]'] = {
            click: this.saveTukerofftoStore
        };

        newEvs['absentrecordformoptionstukeroff button[action=process]'] = {
            click: function () {
                var me;
                me = this;
                me.saveTukeroff();
            }

        };
        /* end added by ahmad riadi 01-11-2017 */

        /* start added by ahmad riadi 06-11-2017 */
        newEvs['absentrecordformdatashift'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formDataShiftAfterrender();
            },
        };
        newEvs['absentrecordformdatashift button[action=save]'] = {
            click: this.saveChangeshift
        };

        
        /* start added by wulan 22-10-2021 */
        /*
        newEvs['absentrecordformdatashiftdetail'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formDataShiftdetailAfterrender();
            },
        };*/



        /* start added by ahmad riadi 13-12-2017 */
        newEvs['absentrecordgrid toolbar button[action=generateworkgroup]'] = {
            click: function () {
                var me;
                me = this;

                me.instantWindow("FormDataWorkGroup", 500, "FORM SETUP WORK GROUP EMPLOYEE", "options", "absentrecordformdataworkgroup");

            }
        };
        newEvs['absentrecordformdataworkgroup'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formWorkgroupAfterRender();
            },
        };
        newEvs['absentrecordformdataworkgroup button[action=save]'] = {
            click: function () {
                var me;
                me = this;
                me.Processgenerateworkgroup();

            }
        };
        /* end added by ahmad riadi 13-12-2017 */


        /* start added by ahmad riadi 14-12-2017 */
        newEvs['absentrecordgridbrowseintranetpdlk actioncolumn'] = {
            click: this.gridIntranetPdlkActionColumnClick
        }
        newEvs['absentrecordformoptionspdlk'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formOptionsPdlkAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDatapdlkintranet();
            }
        };
        newEvs['absentrecordformoptionspdlk button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterdatapdlk();
            }
        };
        newEvs['absentrecordformoptionspdlk button[action=cleardata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFormoptionpdlk().getForm().reset();
                me.getDatapdlkintranet();
            }
        }
        newEvs['absentrecordformdataintranetpdlk'] = {
            afterrender: function () {
                var me, form;
                me = this;
                me.formDataPdlkAfterrender();
            },
        };

        newEvs['absentrecordformdataintranetpdlk [name=hrd_comment]'] = {
            blur: function (that, The, eOpts) {
                var me, form, hrd_comment, counter_hrd_comment;
                me = this;
                form = me.getFormdatapdlk();
                hrd_comment = form.down("[name=hrd_comment]").getValue();
                counter_hrd_comment = hrd_comment.length;

                if (me.hrd_check_pdlk !== 'YES') {
                    if (counter_hrd_comment > 0) {
                        form.down("[name=sendmail]").setValue(true);
                    } else {
                        form.down("[name=sendmail]").setValue(false);
                    }
                }

            },
        };
        newEvs['absentrecordformdataintranetpdlk button[action=save]'] = {
            click: this.saveIntranetPdlktoStore
        };
        newEvs['absentrecordformoptionspdlk button[action=process]'] = {
            click: this.SaveIntranetpdlkToCES
        };
        /* end added by ahmad riadi 14-11-2017 */


        /* start  added by ahmad riadi 04-01-2017 */
        newEvs['absentrecordformoptionsovertime'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formOptionsOvertimeAfterrender();
            },
            boxready: function () {
                var me;
                me = this;
                me.getDataovertimeintranet();
            }
        };

        /* end added by ahmad riadi 04-01-2017 */

        newEvs['absentrecordgrid toolbar button[action=transferbyapi]'] = {
            click: function () {
                var me;
                me = this;
                me.instantWindow("Formoptionsapi", 920, "Browse Transaction by API", "options", "absentrecordformoptionsapi");
            }
        };
        newEvs['absentrecordformoptionsapi'] = {
            afterrender: function () {
                var me;
                me = this;
                me.formOptionsAPIAfterrender();
            }
        };
        
        newEvs['absentrecordformoptionsapi button[action=getdata]'] = {
            click: function () {
                var me;
                me = this;
                me.getFilterdatatransactionapi();
            }
        };
        newEvs['absentrecordformoptionsapi button[action=cleardata]'] = {
            click: function () {
                var me,form;
                me = this;
                form = me.getFormoptionsapi();
                form.getForm().reset();
                me.getDataapiintranet();
            }
        };

        newEvs['absentrecordformoptionsapi button[action=process]'] = {
            click: function () {
                var me;
                me = this;
                me.Processtransactionapi();
            }
        };
         
        // wulan edit 2020 03 19
        newEvs['absentrecordgrid button[action=inoutwfh]'] = {
            click: function () {
                me.inoutwfhOnClick();
            }
        };


        this.control(newEvs);
        this.control(processAbsent.getEvents());

    },

    /* start added by ahmad riadi 13-12-2017 */
    Processgenerateworkgroup: function () {
        var me, form, formvalue;
        me = this;
        form = me.getFormworkgroup();
        if (form.getForm().isValid()) {
            formvalue = form.getForm().getValues();
            Ext.Msg.confirm('Confirm', "Apakah Pola shift dan periode proses sudah benar ?", function (btn) {
                if (btn == 'yes') {
                    form.up('window').body.mask('Create data periode and shift, please wait ...');
                    me.tools.ajax({
                        params: {
                            "paramdata": Ext.JSON.encode(formvalue),
                        },
                        success: function (data, model) {
                            form.el.unmask();
                            Ext.Msg.alert('Info', 'Process finish');
                            me.emGrid().select();
                            form.up('window').body.unmask();
                            form.up('window').close();
                        }
                    }).read('processgeneratebyworkgroup');


                }
            });
        }
    },
    formWorkgroupAfterRender: function () {
        var me, form, storeworkgroup;
        me = this;
        form = me.getFormworkgroup();
        storeworkgroup = form.down('[name=workgroup_id]').getStore();
        storeworkgroup.load();
    },
    /* end added by ahmad riadi 13-12-2017 */


    fcbStartDateOnBlur: function () {
        var me = this;
        var f = me.getFormcutiber();
        var difDay = me.tools.getDiffDay(f.down("[name=start_date]").getValue(), f.down("[name=end_date]").getValue());
        //  difDay = difDay+1;
        difDay = difDay * -1;
        difDay = difDay + 1;
        f.down("[name=jml_hari_kepotong]").setValue(difDay);


    },
    fcbEndDateOnBlur: function () {
        var me = this;
        me.fcbStartDateOnBlur();

    },
    invalidAbsentDptOnBlur: function () {
        var me = this;
        var f = me.getForminvalidabsent();

        var s = me.getGridinvalidabsent().getStore();

        var ids = f.down("[name=department_id]").getValue();
        s.clearFilter();
        s.filterBy(function (rec, id) {

            if (ids.indexOf(rec.raw.department.department_id) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    },
    invalidAbsentSendMailOnClick: function () {
        var me = this;
        var f = me.getForminvalidabsent();
        var g = me.getGridinvalidabsent();


        var selects = g.getSelectionModel().getSelection();
        console.log(selects);

        if (selects.length == 0) {
            me.tools.alert.warning("Tidak ada karyawan yang terpilih.");
            return;
        }

        /// cek email
        var noEmail = "";
        var emails = [];
        for (var i in selects) {
            if (selects[i]['data']['employee_email_ciputra'] == "") {
                noEmail += selects[i]['data']['employee_employee_name'] + ",";
            } else {
                emails.push(selects[i]['data']['employee_email_ciputra'] + "##" + selects[i]['data']['employee_employee_name']);
            }
        }

        if (noEmail.length > 0) {
            me.tools.alert.warning("Karyawan berikut tidak ada emailnya : " + noEmail + ". Silahkan mendaftarkan emailnya terlebih dahulu.");
            return;
        }

        f.setLoading("Memproses email....");

        me.tools.ajax({
            params: {
                emails: emails.join("~")
            },
            success: function (data, model) {
                console.log(data);
                var status = data.others[0][0]['HASIL'];
                var msg = data.others[0][0]['MSG'];
                if (!status) {
                    me.tools.alert.warning(msg);
                } else {
                    me.tools.alert.info("Sukses!");
                }
                f.setLoading(false);

            }
        }).read('sendmailia');
    },
    invalidAbsentPilihSemuaOnCheck: function () {
        var me = this;
        var f = me.getForminvalidabsent();
        var v = f.down("[name=select_all]").getValue();


        if (v === false) {
            me.getGridinvalidabsent().getSelectionModel().deselectAll();
        } else {
            me.getGridinvalidabsent().getSelectionModel().selectAll();
        }

    },
    cariInvalidObjectOnClick: function () {
        var me = this;
        var g = me.getGridinvalidabsent();
        var f = me.getForminvalidabsent();
        var vs = f.getValues();
        var ds = f.down("[name=department_id]").getStore();


        /// durasi maksimal 30 hari
        var start = moment(f.down("[name=start_date]").getValue()); //tgl klaim
        var end = moment(f.down("[name=end_date]").getValue()); //tanggal terakhir klaim
        var duration = moment.duration(end.diff(start));
        var days = duration.asDays();

        console.log(days);

        if (days > 30) {
            me.tools.alert.warning("Durasi tanggal maksimal 30 hari");
            return;
        }

        g.doInit();
        g.getStore().getProxy().extraParams.start_date = vs.start_date;
        g.getStore().getProxy().extraParams.end_date = vs.end_date;

        g.doLoad({}, function () {
            /// refill combo departemen sesuai grid karyawan
            var dftDepartemen = [];

            //  ds.clearFilter();



            ds.loadData([], false);

            g.getStore().each(function (rec) {
                var code = rec.get("department_code");

                if (dftDepartemen.indexOf(code) < 0) {
                    dftDepartemen.push(code);


                    ds.add({
                        'department_id': rec.get("department_department_id"),
                        'code': code
                    });

                }

            });











            f.down("[name=select_all]").setValue(false);
        });
    },
    invalidabsentOnClick: function () {
        var me = this;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        var w = me.instantWindow("FormInvalidabsent", 600, "Notifikasi Email", "create", "invalidabsent");
        var f = me.getForminvalidabsent();
        f.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                f.setLoading(false);

            }
        }).read('invalidabsentinit');
        //  var f = me.getFormcutiber();

    },
    loadPage: function (store) {
        store.loadPage(1, {
            callback: function (rec, operation, success) {
                if (!me.getGrid().getStore().modelExist) {

                    me.getGrid().attachModel(operation);
                }



            }
        });
        var me = this;
        // me.getGrid().xLoad();
    },
    refreshGrid: function () {
        var me = this;
        if (me.getGridemployee().getStore().getCount() > 0) {
            me.getGridemployee().getSelectionModel().select(0);
        }

    },
    reasonDeleteOnClick: function () {
        var me = this;

        if (!me.reasonDeleteClick) { // mencegah duplikasi proses
            var f = me.getFormreason();
            console.log(f.getForm().getValues());
            f.setLoading("Deleting data...");
            
            var data = f.getForm().getValues();

            // added by Michael 2021.05.19 
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
            // end added by Michael 2021.05.19 

            me.tools.ajax({
                params: {
                    absentdetail_id: f.down("[name=absentdetail_id]").getValue(),
                    employee_id: data["employee_employee_id"],
                    is_halfday: data["is_halfday"],
                    start_date: data["start_date"],
                    // added by Michael 2021.05.19 
                    projectptid_opsi: projectptid_opsi
                    // end added by Michael 2021.05.19 
                },
                fail: function (msg, data) {

                    f.setLoading(false);
                },
                success: function (data) {
                    f.setLoading(false);
                    f.up("window").close();
                    me.refreshGrid();
                    me.tools.alert.info("Success!");
                }
            }).process('deletereason');

            me.reasonDeleteClick = true;
        }

    },
    setupShiftCheckAll: function (row) {
        var me = this;
        var f = me.getFormshift();

        var val = f.down("[name=day_" + (100 + row) + "]").getValue();
        row = row >= 7 ? 0 : row;
        for (var i = 1; i <= 31; i++) {
            if (i % 7 == row) {
                f.down("[name=day_" + i + "]").setValue(val);
            }

        }
    },
    setupShiftClearSelection: function () {
        //alert("Hello");
        var me = this;
        var f = me.getFormshift();


        for (var i = 1; i <= 31; i++) {
            f.down("[name=day_" + i + "]").setValue(0);
            //cb.push({boxLabel: i, name: 'day_' + i, inputValue: i, margin: 5});
        }
        for (var i = 1; i <= 7; i++) {
            f.down("[name=day_" + (i + 100) + "]").setValue(0);
        }


    },
    toolCutiBersama: function () {
        var me = this;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        var x = {
            showForm: function () {

                var w = me.instantWindow("FormCutiBersama", 600, "Cuti Bersama", "create", "cutiberwindow");
                var f = me.getFormcutiber();
                var g = w.down("grid");
                var that = this;


                g.doInit();
                g.doLoad({
                    
                    // added by Michael 2021.05.19 
                    projectptid_opsi:projectptid_opsi
                    // end added by Michael 2021.05.19 
                    
                }, function (rec, operation, success) {
                    that.updateJumlah();




                });
                // var g = f.down("grid");
                // g.doInit();

                /*
                 
                 */


            },
            proses: function () {
                var f = me.getFormcutiber();
                var vs = f.getForm().getValues();

                var ids = "";

                f.setLoading("Proses cuti bersama...");

                me.getGridcutibersama().getStore().each(function (rec) {

                    if (rec != null) {
                        ids += rec.get("employee_id") + "~";
                    }

                });



                vs["ids"] = ids;

                // added by Michael 2021.05.19 
                vs["projectptid_opsi"] = projectptid_opsi;
                // end added by Michael 2021.05.19 

                me.tools.ajax({
                    params: vs,
                    fail: function (msg, data) {

                        f.setLoading(false);
                        /// tidak ada confirm lagi
                        if (data["JENISERR"] == 99) {
                            me.tools.alert.warning(data["MSG"]);
                            return;
                        }

                        Ext.Msg.show({
                            title: 'Confirm',
                            msg: msg + '. Lanjut proses cuti bersama ?',
                            buttons: Ext.Msg.YESNO,
                            icon: Ext.Msg.QUESTION,
                            fn: function (clicked) {

                                /// jika yes maka mengirim ulang request 
                                if (clicked === "yes") {
                                    vs["confirmed"] = true;
                                    me.tools.ajax({
                                        params: vs,
                                        fail: function (msg, data) {

                                            f.setLoading(false);
                                            me.tools.alert.warning(msg);

                                        },
                                        success: function (data) {
                                            f.setLoading(false);
                                            f.up("window").close();
                                            me.tools.alert.info("Success!");
                                        }
                                    }).processNoWarningAlert('cutibersama');
                                }

                            }
                        });

                    },
                    success: function (data) {
                        f.setLoading(false);
                        f.up("window").close();
                        me.tools.alert.info("Success!");
                    }
                }).processNoWarningAlert('cutibersama');
            },
            removeEmployee: function () {

                var g = me.getGridcutibersama();
                var recs = g.getSelectionModel().getSelection();
                var s = g.getStore();
                var selectedCount = 0;
                var cTotal = s.getCount();
                if (recs.length > 0) {
                    // var ids = "";
                    for (var i in recs) {
                        selectedCount++;
                        s.remove(recs[i]);
                        // ids +=recs[i].get("employee_id")+"~";
                    }



                    this.updateJumlah();

                } else {
                    me.tools.alert.warning("Tidak ada karyawan terpilih");
                }

                // console.log(recs);
            },
            updateJumlah: function () {

                me.getGridcutibersama().up("form").down("#labelJumlah").setText("Jumlah karyawan terpilih: " + me.getGridcutibersama().getStore().getCount());
            }
        };
        return x;
    },
    // added by Michael 2021.06.30 
    toolCutiTambahan: function () {
        var me = this;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        var x = {
            showForm: function () {

                var w = me.instantWindow("FormCutiTambahan", 600, "Extra Leave", "create", "cutitambahanwindow");
                var f = me.getFormcutitambahan();
                var g = w.down("grid");
                var that = this;


                // g.doInit();
                // g.doLoad({
                //     projectptid_opsi:projectptid_opsi
                // }, function (rec, operation, success) {
                //     that.updateJumlah();
                // });

                var year = new Date().getFullYear();
                f.down("[name=periode]").setValue(year);
                // f.down("[name=proses]").setValue('1');

            },
            proses: function () {
                var f = me.getFormcutitambahan();
                var vs = f.getForm().getValues();

                var ids = "";

                me.getGridcutitambahan().getStore().each(function (rec) {

                    if (rec != null) {
                        ids += rec.get("employee_id") + "~";
                    }

                });



                vs["ids"] = ids;

                vs["projectptid_opsi"] = projectptid_opsi;

                if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
                    me.tools.alert.warning("Periode is required");
                    return false;
                } else {
                    periode = f.down('[name=periode]').getValue();
                }

                leavegroup = f.down('[name=leavegroup]').getGroupValue();
                
                if(f.down('[name=expired_date]').getValue() == '' || f.down('[name=expired_date]').getValue() == null){
                    me.tools.alert.warning("Expired Date is required");
                    return false;
                } else {
                    expired_date = f.down('[name=expired_date]').getValue();
                }

                if(f.down('[name=amount]').getValue() == '' || f.down('[name=amount]').getValue() == null){
                    me.tools.alert.warning("Leave Entitlements is required");
                    return false;
                } else {
                    amount = f.down('[name=amount]').getValue();
                }

                if(f.down('[name=description]').getValue() == '' || f.down('[name=description]').getValue() == null){
                    me.tools.alert.warning("Description is required");
                    return false;
                } else {
                    description = f.down('[name=description]').getValue();
                }

                extraleave_id = f.down('[name=extraleave_id]').getValue();
                proses = f.down('[name=proses]').getValue();
                cancel = f.down('[name=cancel]').getValue();


                if(extraleave_id && proses == 1 && cancel == 0 && ids == ''){
                    Ext.Msg.confirm('Confirm', "Extra Leave ini sudah pernah di proses & anda menghapus semua employeenya, saat anda proses ini berarti Extra Leave ini akan langsung dicancel karena employeenya kosong.", function (btn) {
                        if (btn == 'yes') {
                            f.setLoading("Proses extra leave...");
                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'periode': periode,
                                        'leavegroup': leavegroup,
                                        'expired_date': expired_date,
                                        'amount': amount,
                                        'description': description,
                                        'extraleave_id': extraleave_id,
                                    },
                                    success: function (data, model) {
                                        var hasil = data.others[0][0]['hasil'][0][0]['result'];
                                        var msg = data.others[0][0]['msg'];
                                        console.log(msg);
                                    }
                            }).read('saveheader_cutitambahan');
                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'periode': periode,
                                        'leavegroup': leavegroup,
                                        'expired_date': expired_date,
                                        'amount': amount,
                                        'description': description,
                                        'extraleave_id': extraleave_id,
                                    },
                                    success: function (data, model) {
                                        var hasil = data.others[0][0]['HASIL'];
                                        var msg = data.others[0][0]['MSG'];
                                        f.setLoading(false);
                                        f.up("window").close();
                                        me.tools.alert.info(msg);
                                    }
                            }).read('savebutcancel_cutitambahan');
                        }
                    });
                }else{

                    if(ids == '' || ids == null){
                        me.tools.alert.warning("Please add employee");
                        return false;
                    } else {
                        vs["ids"] = ids;
                    }

                    f.setLoading("Proses extra leave...");

                    me.tools.ajax({
                            params: {
                                'projectptid_opsi':projectptid_opsi,
                                'periode': periode,
                                'leavegroup': leavegroup,
                                'expired_date': expired_date,
                                'amount': amount,
                                'description': description,
                                'extraleave_id': extraleave_id,
                            },
                            success: function (data, model) {
                                var hasil = data.others[0][0]['hasil'][0][0]['result'];
                                var msg = data.others[0][0]['msg'];
                                console.log(msg);
                            }
                    }).read('saveheader_cutitambahan');

                    me.tools.ajax({
                        params: vs,
                        fail: function (msg, data) {

                            f.setLoading(false);
                            /// tidak ada confirm lagi
                            if (data["JENISERR"] == 99) {
                                me.tools.alert.warning(data["MSG"]);
                                return;
                            }

                            Ext.Msg.show({
                                title: 'Confirm',
                                msg: msg + '. Lanjut proses extra leave ?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function (clicked) {

                                    /// jika yes maka mengirim ulang request 
                                    if (clicked === "yes") {
                                        vs["confirmed"] = true;
                                        me.tools.ajax({
                                            params: vs,
                                            fail: function (msg, data) {

                                                f.setLoading(false);
                                                me.tools.alert.warning(msg);

                                            },
                                            success: function (data) {
                                                f.setLoading(false);
                                                f.up("window").close();
                                                me.tools.alert.info("Success!");
                                            }
                                        }).processNoWarningAlert('cutitambahan');
                                    }

                                }
                            });

                        },
                        success: function (data) {
                            f.setLoading(false);
                            f.up("window").close();
                            var msg = data['MSG'];
                            me.tools.alert.info(msg);
                        }
                    }).processNoWarningAlert('cutitambahan');
                }

            },
            cancel: function () {
                var f = me.getFormcutitambahan();
                var vs = f.getForm().getValues();

                var ids = "";

                me.getGridcutitambahan().getStore().each(function (rec) {

                    if (rec != null) {
                        ids += rec.get("employee_id") + "~";
                    }

                });



                vs["ids"] = ids;

                vs["projectptid_opsi"] = projectptid_opsi;

                extraleave_id = f.down('[name=extraleave_id]').getValue();
                proses = f.down('[name=proses]').getValue();
                cancel = f.down('[name=cancel]').getValue();


                if(extraleave_id && proses == 1 && cancel == 0 && ids == ''){
                    if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
                        me.tools.alert.warning("Periode is required");
                        return false;
                    } else {
                        periode = f.down('[name=periode]').getValue();
                    }

                    leavegroup = f.down('[name=leavegroup]').getGroupValue();
                    
                    if(f.down('[name=expired_date]').getValue() == '' || f.down('[name=expired_date]').getValue() == null){
                        me.tools.alert.warning("Expired Date is required");
                        return false;
                    } else {
                        expired_date = f.down('[name=expired_date]').getValue();
                    }

                    if(f.down('[name=amount]').getValue() == '' || f.down('[name=amount]').getValue() == null){
                        me.tools.alert.warning("Leave Entitlements is required");
                        return false;
                    } else {
                        amount = f.down('[name=amount]').getValue();
                    }

                    if(f.down('[name=description]').getValue() == '' || f.down('[name=description]').getValue() == null){
                        me.tools.alert.warning("Description is required");
                        return false;
                    } else {
                        description = f.down('[name=description]').getValue();
                    }

                    Ext.Msg.confirm('Confirm', "Extra Leave ini sudah pernah di proses & anda menghapus semua employeenya, saat anda proses ini berarti Extra Leave ini akan langsung dicancel karena employeenya kosong.", function (btn) {
                        if (btn == 'yes') {
                            f.setLoading("Proses extra leave...");
                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'periode': periode,
                                        'leavegroup': leavegroup,
                                        'expired_date': expired_date,
                                        'amount': amount,
                                        'description': description,
                                        'extraleave_id': extraleave_id,
                                    },
                                    success: function (data, model) {
                                        var hasil = data.others[0][0]['hasil'][0][0]['result'];
                                        var msg = data.others[0][0]['msg'];
                                        console.log(msg);
                                    }
                            }).read('saveheader_cutitambahan');
                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'periode': periode,
                                        'leavegroup': leavegroup,
                                        'expired_date': expired_date,
                                        'amount': amount,
                                        'description': description,
                                        'extraleave_id': extraleave_id,
                                    },
                                    success: function (data, model) {
                                        var hasil = data.others[0][0]['HASIL'];
                                        var msg = data.others[0][0]['MSG'];
                                        f.setLoading(false);
                                        f.up("window").close();
                                        me.tools.alert.info(msg);
                                    }
                            }).read('savebutcancel_cutitambahan');
                        }
                    });
                }else{
                    f.up("window").close();
                }
            },
            removeEmployee: function () {

                var f = me.getFormcutitambahan();
                var g = me.getGridcutitambahan();
                var recs = g.getSelectionModel().getSelection();
                var s = g.getStore();
                var selectedCount = 0;
                var cTotal = s.getCount();
                if (recs.length > 0) {

                    var countarray  = recs.length;
                    var counter     = 0;

                    var extraleave_id = f.down("[name=extraleave_id]").getValue();
                    var proses = f.down('[name=proses]').getValue();
                    var cancel = f.down('[name=cancel]').getValue();

                    var amount = f.down('[name=amount]').getValue();
                    var description = f.down('[name=description]').getValue();
                    var periode = f.down('[name=periode]').getValue();
                    var expired_date = f.down('[name=expired_date]').getValue();
                    var leavegroup = f.down('[name=leavegroup]').getGroupValue();

                    // for (var i in recs) {
                    //     selectedCount++;
                    //     s.remove(recs[i]);
                    // }
                    // this.updateJumlah();



                    for (var i = 0; i < recs.length; i++) {

                        me.tools.ajax({
                                params: {
                                    'projectptid_opsi':projectptid_opsi,
                                    'extraleave_id': extraleave_id,
                                    'employee_id'   : recs[i]['data'].employee_id,
                                    'proses': proses,
                                    'cancel': cancel,
                                    'amount': amount,
                                    'description': description,
                                    'periode': periode,
                                    'expired_date': expired_date,
                                    'leavegroup':leavegroup
                                },
                                success: function (data, model) {
                                    counter++;
                                    if (countarray == counter) {

                                        var detailGrid = me.getGridcutitambahan();
                                        
                                        detailGrid.doInit();
                                        detailGrid.getStore().load({
                                                params: {
                                                    'extraleave_id': extraleave_id,
                                                    'projectptid_opsi':projectptid_opsi,
                                                },
                                                callback: function (recs, op) {
                                                        detailGrid.attachModel(op);
                                                        
                                                        detailGrid.up("form").down("#labelJumlah").setText("Jumlah karyawan terpilih: " + detailGrid.getStore().getCount());
                                                }
                                        });

                                    }
                                }
                        }).read('removeemployee_cutitambahan');

                    }

                } else {
                    me.tools.alert.warning("Tidak ada karyawan terpilih");
                }

                // console.log(recs);
            },
            addEmployee: function () {

                var f = me.getFormcutitambahan();

                if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
                    me.tools.alert.warning("Periode is required");
                    return false;
                } else {
                    periode = f.down('[name=periode]').getValue();
                }

                leavegroup = f.down('[name=leavegroup]').getGroupValue();
                
                if(f.down('[name=expired_date]').getValue() == '' || f.down('[name=expired_date]').getValue() == null){
                    me.tools.alert.warning("Expired Date is required");
                    return false;
                } else {
                    expired_date = f.down('[name=expired_date]').getValue();
                }

                if(f.down('[name=amount]').getValue() == '' || f.down('[name=amount]').getValue() == null){
                    me.tools.alert.warning("Leave Entitlements is required");
                    return false;
                } else {
                    amount = f.down('[name=amount]').getValue();
                }

                if(f.down('[name=description]').getValue() == '' || f.down('[name=description]').getValue() == null){
                    me.tools.alert.warning("Description is required");
                    return false;
                } else {
                    description = f.down('[name=description]').getValue();
                }

                var extraleave_id = f.down("[name=extraleave_id]").getValue();

                if(extraleave_id){
                    me.addDetail('create');
                }else{
                    me.tools.ajax({
                        params: {
                            'projectptid_opsi':projectptid_opsi,
                            'periode': periode,
                            'leavegroup': leavegroup,
                            'expired_date': expired_date,
                            'amount': amount,
                            'description': description,
                            'extraleave_id':extraleave_id
                        },
                        success: function (data, model) {
                            var hasil = data.others[0][0]['hasil'][0][0]['result'];
                            var msg = data.others[0][0]['msg'];

                            if(hasil >= 1 && msg == 'success'){
                                f.down("[name=extraleave_id]").setValue(hasil);
                                me.addDetail('create');
                            }
                        }
                    }).read('saveheader_cutitambahan');
                }


            },
            updateJumlah: function () {

                me.getGridcutitambahan().up("form").down("#labelJumlah").setText("Jumlah karyawan terpilih: " + me.getGridcutitambahan().getStore().getCount());
            },
            view: function () {

                var g = me.getGridcutitambahan();
                var s = g.getStore();
                var cTotal = s.getCount();

                var f = me.getFormcutitambahan();
                var extraleave_id = f.down("[name=extraleave_id]").getValue();

                if(extraleave_id){
                    // Ext.Msg.confirm('Confirm', "Silahkan selesaikan dahulu ", function (btn) {
                    //     if (btn == 'yes') {
                    //     }
                    // });
                    me.tools.alert.warning("Silahkan selesaikan & proses dahulu form extra leave anda.");
                    return false;
                }else{
                    me.instantWindow("Panel", 900, "View Log", "create", "cutitambahanviewLookup", "lookup.cutitambahanview", {
                        itemId: me.controllerName + 'viewlog'
                    });
                    me.lookupViewlog();
                }
                
            }
        };
        return x;
    },
    addDetail: function (state) {
        var me = this;      
        var window = me.instantWindow("Panel", 900, "Employee", "create", "cutitambahanLookup", "lookup.cutitambahan", {
                    itemId: me.controllerName + 'employee'
            });

        f = me.getFormsearchlookupct();
        this.lookupEmployee();
    },
    lookupEmployee: function(){
            var me, form, department_id, grid, vs;
            me = this;
            var f = me.getFormcutitambahan();
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();

            form = me.getFormsearchlookupct();

            var vs = form.getValues();
            
            if(vs['employee_nik'] == null){
               employee_nik = 0;
            } else {
               employee_nik = vs['employee_nik'];
            }

            if(vs['employee_name']==null){
               employee_name = 0;
            }else{
               employee_name = vs['employee_name'];
            }

            if(vs['department_id']==null){
               department_id = 0;
            }else{
               department_id = vs['department_id'];
            }

            grid = me.getGridlookupct();
            grid.setLoading("Please wait...");
            var extraleave_id = f.down("[name=extraleave_id]").getValue();
            me.tools.ajax({
                    params: {
                            'extraleave_id':extraleave_id,
                            'employee_nik': employee_nik,
                            'employee_name': employee_name,
                            'department_id': department_id,
                            'projectptid_opsi':projectptid_opsi
                    },
                    success: function(data, model) {
                            me.tools.wesea({data: data, model: model}, grid).grid();
                            grid.setLoading(false);
                    }
            }).read('employeelist_cutitambahan');
    },
    selectEmployee: function () {
        var me, grid, rows, data, row, counter, countarray, act_name, fields, kelompokabsensi_id;
        me = this;
        grid = me.getGridlookupct();
        rows = grid.getSelectionModel().getSelection();
        var f = me.getFormcutitambahan();
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();

        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {

                var p = grid.up("window").down("panel");
                p.setLoading("Please wait...");

                countarray  = rows.length;
                counter     = 0;
            var extraleave_id = f.down("[name=extraleave_id]").getValue();

        for (var i = 0; i < rows.length; i++) {

                    //data["details"] = me.getGriddetail().getJson();
                    me.tools.ajax({
                            params: {
                                'projectptid_opsi':projectptid_opsi,
                                'extraleave_id': extraleave_id,
                                'employee_id'   : rows[i]['data'].employee_id
                            },
                            success: function (data, model) {
                                counter++;
                                if (countarray == counter) {

                                    var detailGrid = me.getGridcutitambahan();
                                    
                                    detailGrid.doInit();
                                    detailGrid.getStore().load({
                                            params: {
                                                'extraleave_id': extraleave_id,
                                                'projectptid_opsi':projectptid_opsi,
                                            },
                                            callback: function (recs, op) {
                                                    detailGrid.attachModel(op);
                                                    grid.up("window").close();
                                                    p.setLoading(false);
                                                    
                                                    detailGrid.up("form").down("#labelJumlah").setText("Jumlah karyawan terpilih: " + detailGrid.getStore().getCount());
                                            }
                                    });

                                }
                            }
                    }).read('selectemployee_cutitambahan');

                }

        }
    },
    lookupViewlog: function(){
            var me, form, grid, vs;
            me = this;
            var f = me.getFormcutitambahan();
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();

            form = me.getFormsearchlookupctv();

            var vs = form.getValues();
            
            if(vs['periode'] == null){
               periode = 0;
            } else {
               periode = vs['periode'];
            }

            if(vs['leavegroup']==null){
               leavegroup = 0;
            }else{
               leavegroup = vs['leavegroup'];
            }

            if(vs['description']==null){
               description = 0;
            }else{
               description = vs['description'];
            }

            grid = me.getGridlookupctv();
            grid.setLoading("Please wait...");

            me.tools.ajax({
                    params: {
                            'periode':periode,
                            'leavegroup': leavegroup,
                            'description': description,
                            'projectptid_opsi':projectptid_opsi
                    },
                    success: function(data, model) {
                            me.tools.wesea({data: data, model: model}, grid).grid();
                            grid.setLoading(false);
                    }
            }).read('loglist_cutitambahan');
    },
    viewemployeeViewlog: function(){
            var me, form, grid, vs;
            me = this;
            grid = me.getGridlookupctv();
            rows = grid.getSelectionModel().getSelection();
            var f = me.getFormcutitambahan();
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
            
            if (rows.length < 1) {
                Ext.Msg.alert('Info', 'No record selected..!');
                return;
            } else {
                if (rows.length > 1) {
                    Ext.Msg.alert('Info', 'Silahkan pilih 1 record..!');
                    return;
                } else {

                    var p = grid.up("window").down("panel");
                    p.setLoading("Please wait...");
                    
                    countarray  = rows.length;
                    counter     = 0;
                    
                    // if(rows[0].data.cancel == 1){

                        // var w = me.instantWindow("FormCutiTambahanView", 600, "View Employee", "view", "absentrecordformcutitambahanview");
                        for (var i = 0; i < rows.length; i++) {

                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'extraleave_id': rows[i]['data'].extraleave_id,
                                    },
                                    success: function (data, model) {
                                        var w = me.instantWindow("FormCutiTambahanView", 600, "View Employee", "view", "absentrecordformcutitambahanview");
                                        var fv = me.getFormcutitambahanview();
                                        var gv = me.getGridcutitambahanview();
                                        me.tools.wesea({data: data, model: model}, gv).grid();
                                        fv.down("#labelJumlahView").setText("Jumlah karyawan terpilih: " + gv.getStore().getCount());
                                        p.setLoading(false);

                                    }
                            }).read('viewemployee_cutitambahan');

                            // var detailGrid = me.getGridcutitambahanview();
                                            
                            // detailGrid.doInit();
                            // detailGrid.getStore().load({
                            //     params: {
                            //         'extraleave_id': rows[i]['data'].extraleave_id,
                            //         'projectptid_opsi':projectptid_opsi,
                            //     },
                            //     callback: function (recs, op) {
                            //             detailGrid.attachModel(op);
                                                                        
                            //             detailGrid.up("form").down("#labelJumlahView").setText("Jumlah karyawan terpilih: " + detailGrid.getStore().getCount());
                            //             p.setLoading(false);
                            //     }
                            // });

                        }

                    // }else{
                    //     me.editprosesViewlog();
                    // }


                }
            }
    },
    editprosesViewlog: function(){
            var me, form, grid, vs, rows;
            me = this;
            var grid = me.getGridlookupctv();
            var rows = grid.getSelectionModel().getSelection();
            var f = me.getFormcutitambahan();
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
            
            if (rows.length < 1) {
                Ext.Msg.alert('Info', 'No record selected..!');
                return;
            } else {
                if (rows.length > 1) {
                    Ext.Msg.alert('Info', 'Silahkan pilih 1 record..!');
                    return;
                } else {

                    if(rows[0].data.cancel == 1){

                        Ext.Msg.alert('Info', 'Record jika sudah di cancel, tidak bisa di edit..');
                        return;

                    }else{
                        var p = grid.up("window").down("panel");
                        p.setLoading("Please wait...");

                        var countarray  = rows.length;
                        var counter     = 0;

                        for (var i = 0; i < rows.length; i++) {

                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'extraleave_id': rows[i]['data'].extraleave_id,
                                    },
                                    success: function (data, model) {
                                        
                                        f.down("[name=extraleave_id]").setValue(data['others'][0][0]['HASIL']['extraleave_id']);
                                        f.down("[name=proses]").setValue(data['others'][0][0]['HASIL']['proses']);
                                        f.down("[name=cancel]").setValue(data['others'][0][0]['HASIL']['cancel']);

                                        f.down("[name=periode]").setValue(data['others'][0][0]['HASIL']['periode']);
                                        f.down("[name=periode]").setReadOnly(true);
                                        f.down("[name=leavegroup]").setValue(data['others'][0][0]['HASIL']['leavegroup']);
                                        f.down("#leaveGroupId").setReadOnly(true);
                                        f.down("[name=expired_date]").setValue(data['others'][0][0]['HASIL']['expired_date']);
                                        f.down("[name=expired_date]").setReadOnly(true);
                                        f.down("[name=amount]").setValue(data['others'][0][0]['HASIL']['amount']);
                                        f.down("[name=amount]").setReadOnly(true);
                                        f.down("[name=description]").setValue(data['others'][0][0]['HASIL']['description']);
                                        f.down("[name=description]").setReadOnly(true);

                                        var detailGrid = me.getGridcutitambahan();
                                        
                                                    detailGrid.doInit();
                                                    detailGrid.getStore().load({
                                                            params: {
                                                                'extraleave_id': data['others'][0][0]['HASIL']['extraleave_id'],
                                                                'projectptid_opsi':projectptid_opsi,
                                                            },
                                                            callback: function (recs, op) {
                                                                    detailGrid.attachModel(op);
                                                                    
                                                                    detailGrid.up("form").down("#labelJumlah").setText("Jumlah karyawan terpilih: " + detailGrid.getStore().getCount());
                                                            }
                                                    });


                                        grid.up("window").close();
                                        p.setLoading(false);
                                    }
                            }).read('editproses_cutitambahan');

                        }

                    }

                }
            }
    },
    cancelprosesViewlog: function(){
            var me, form, grid, vs;
            me = this;
            grid = me.getGridlookupctv();
            rows = grid.getSelectionModel().getSelection();
            var f = me.getFormcutitambahan();
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
            
            if (rows.length < 1) {
                Ext.Msg.alert('Info', 'No record selected..!');
                return;
            } else {
                if (rows.length > 1) {
                    Ext.Msg.alert('Info', 'Silahkan pilih 1 record..!');
                    return;
                } else {

                    if(rows[0].data.cancel == 1){

                        Ext.Msg.alert('Info', 'Extra Leave sudah di cancel prosesnya, Silahkan pilih yang lain!');
                        return;

                    }else{
                        var p = grid.up("window").down("panel");

                        countarray  = rows.length;
                        counter     = 0;

                        Ext.Msg.confirm('Confirm', "Cuti akan ditarik kembali. Apakah anda yakin ingin cancel proses ini ?", function (btn) {
                            if (btn == 'yes') {
                                p.setLoading("Please wait...");
                                for (var i = 0; i < rows.length; i++) {
                                    if(rows[i]['data'].cancel == 1){
                                        p.setLoading(false);
                                        
                                        setTimeout(function(){  
                                            me.tools.alert.warning("Extra Leave sudah di cancel prosesnya, Silahkan pilih yang lain!");
                                            return false;
                                        }, 100);
                                    }else{
                                        me.tools.ajax({
                                                params: {
                                                    'projectptid_opsi':projectptid_opsi,
                                                    'extraleave_id': rows[i]['data'].extraleave_id,
                                                },
                                                success: function (data, model) {
                                                    if (data['others'][0][0]['MSG']) {
                                                        me.tools.alert.info("Success");
                                                    }else{
                                                        me.tools.alert.info("Something problem..");
                                                    }

                                                    me.tools.ajax({
                                                            params: {
                                                                    'periode':0,
                                                                    'leavegroup': 0,
                                                                    'description': '',
                                                                    'projectptid_opsi':projectptid_opsi
                                                            },
                                                            success: function(data, model) {
                                                                    me.tools.wesea({data: data, model: model}, grid).grid();
                                                                    f.down("[name=extraleave_id]").setValue('');
                                                                    f.down("[name=proses]").setValue('1');
                                                                    f.down("[name=cancel]").setValue('');

                                                                    var year = new Date().getFullYear();
                                                                    f.down("[name=periode]").setValue(year);
                                                                    f.down("[name=leavegroup]").setValue('1');
                                                                    f.down("[name=expired_date]").setValue('');
                                                                    f.down("[name=amount]").setValue('');
                                                                    f.down("[name=description]").setValue('');

                                                                    f.down("[name=periode]").setReadOnly(false);
                                                                    f.down("[name=expired_date]").setReadOnly(false);
                                                                    f.down("#leaveGroupId").setReadOnly(false);
                                                                    f.down("[name=amount]").setReadOnly(false);
                                                                    f.down("[name=description]").setReadOnly(false);

                                                                    f.up("window").close();

                                                            }
                                                    }).read('loglist_cutitambahan');

                                                    p.setLoading(false);

                                                }
                                        }).read('cancelproses_cutitambahan');

                                    }

                                }

                            }
                        });

                    }
                    
                }
            }
    },
    // end added by Michael 2021.06.30 

    // added by Michael 2021.07.16 
    descriptionSanksiKeterlambatan: function(){
        var me = this;
        var f = me.getFormsanksiketerlambatan();
        var year = f.down("[name=periode]").getValue();
        var month = f.down("[name=periode_month]").getValue();

        const monthNames = [" ", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

        var desc = 'Sanksi Keterlambatan bulan '+monthNames[month]+' '+year;
        f.down("[name=description]").setValue('');
        f.down("[name=description]").setValue(desc);
    },
    toolSanksiKeterlambatan: function () {
        var me = this;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        var x = {
            showForm: function () {

                var w = me.instantWindow("FormSanksiKeterlambatan", 600, "Sanksi Keterlambatan", "create", "sanksiketerlambatanwindow");
                var f = me.getFormsanksiketerlambatan();
                var g = w.down("grid");
                var that = this;


                // g.doInit();
                // g.doLoad({
                //     projectptid_opsi:projectptid_opsi
                // }, function (rec, operation, success) {
                //     that.updateJumlah();
                // });

                // var year = new Date().getFullYear();
                var year = me.getSelectedYear();

                f.down("[name=periode]").setValue(year);
                
                // var month = new Date().getMonth()+1;
                var month = me.getSelectedMonth();

                f.down("[name=periode_month]").setValue(month);

                const monthNames = [" ", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

                var desc = 'Sanksi Keterlambatan bulan '+monthNames[month]+' '+year;
                f.down("[name=description]").setValue('');
                f.down("[name=description]").setValue(desc);
                // f.down("[name=proses]").setValue('1');

            },
            proses: function () {
                var f = me.getFormsanksiketerlambatan();
                var vs = f.getForm().getValues();

                var ids = "";

                me.getGridsanksiketerlambatan().getStore().each(function (rec) {

                    if (rec != null) {
                        ids += rec.get("employee_id") + "~";
                    }

                });



                vs["ids"] = ids;

                vs["projectptid_opsi"] = projectptid_opsi;

                if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
                    me.tools.alert.warning("Year is required");
                    return false;
                } else {
                    periode = f.down('[name=periode]').getValue();
                }

                if(f.down('[name=periode_month]').getValue() == '' || f.down('[name=periode_month]').getValue() == null){
                    me.tools.alert.warning("Month is required");
                    return false;
                } else {
                    periode_month = f.down('[name=periode_month]').getValue();
                }

                if(f.down('[name=amount]').getValue() == '' || f.down('[name=amount]').getValue() == null){
                    me.tools.alert.warning("Pengurangan Cuti is required");
                    return false;
                } else {
                    amount = f.down('[name=amount]').getValue();
                }

                if(f.down('[name=description]').getValue() == '' || f.down('[name=description]').getValue() == null){
                    me.tools.alert.warning("Description is required");
                    return false;
                } else {
                    description = f.down('[name=description]').getValue();
                }

                sanksiketerlambatan_id = f.down('[name=sanksiketerlambatan_id]').getValue();
                proses = f.down('[name=proses]').getValue();
                cancel = f.down('[name=cancel]').getValue();


                if(sanksiketerlambatan_id && proses == 1 && cancel == 0 && ids == ''){
                    Ext.Msg.confirm('Confirm', "Sanksi Keterlambatan ini sudah pernah di proses & anda menghapus semua employeenya, saat anda proses ini berarti Sanksi Keterlambatan ini akan langsung dicancel karena employeenya kosong.", function (btn) {
                        if (btn == 'yes') {
                            f.setLoading("Proses sanksi keterlambatan...");
                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'periode': periode,
                                        'periode_month': periode_month,
                                        'amount': amount,
                                        'description': description,
                                        'sanksiketerlambatan_id': sanksiketerlambatan_id,
                                    },
                                    success: function (data, model) {
                                        var hasil = data.others[0][0]['hasil'][0][0]['result'];
                                        var msg = data.others[0][0]['msg'];
                                        console.log(msg);
                                    }
                            }).read('saveheader_sanksiketerlambatan');
                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'periode': periode,
                                        'periode_month':periode_month,
                                        'amount': amount,
                                        'description': description,
                                        'sanksiketerlambatan_id': sanksiketerlambatan_id,
                                    },
                                    success: function (data, model) {
                                        var hasil = data.others[0][0]['HASIL'];
                                        var msg = data.others[0][0]['MSG'];
                                        f.setLoading(false);
                                        f.up("window").close();
                                        me.tools.alert.info(msg);
                                    }
                            }).read('savebutcancel_sanksiketerlambatan');
                        }
                    });
                }else{

                    if(ids == '' || ids == null){
                        me.tools.alert.warning("Please add employee");
                        return false;
                    } else {
                        vs["ids"] = ids;
                    }

                    f.setLoading("Proses sanksi keterlambatan...");

                    me.tools.ajax({
                            params: {
                                'projectptid_opsi':projectptid_opsi,
                                'periode': periode,
                                'periode_month': periode_month,
                                'amount': amount,
                                'description': description,
                                'sanksiketerlambatan_id': sanksiketerlambatan_id,
                            },
                            success: function (data, model) {
                                var hasil = data.others[0][0]['hasil'][0][0]['result'];
                                var msg = data.others[0][0]['msg'];
                                console.log(msg);
                            }
                    }).read('saveheader_sanksiketerlambatan');

                    me.tools.ajax({
                        params: vs,
                        fail: function (msg, data) {

                            f.setLoading(false);
                            /// tidak ada confirm lagi
                            if (data["JENISERR"] == 99) {
                                me.tools.alert.warning(data["MSG"]);
                                return;
                            }

                            Ext.Msg.show({
                                title: 'Confirm',
                                msg: msg + '. Lanjut proses sanksi keterlambatan ?',
                                buttons: Ext.Msg.YESNO,
                                icon: Ext.Msg.QUESTION,
                                fn: function (clicked) {

                                    /// jika yes maka mengirim ulang request 
                                    if (clicked === "yes") {
                                        vs["confirmed"] = true;
                                        me.tools.ajax({
                                            params: vs,
                                            fail: function (msg, data) {

                                                f.setLoading(false);
                                                me.tools.alert.warning(msg);

                                            },
                                            success: function (data) {
                                                f.setLoading(false);
                                                f.up("window").close();
                                                me.tools.alert.info("Success!");
                                            }
                                        }).processNoWarningAlert('sanksiketerlambatan');
                                    }

                                }
                            });

                        },
                        success: function (data) {
                            f.setLoading(false);
                            f.up("window").close();
                            var msg = data['MSG'];
                            me.tools.alert.info(msg);
                        }
                    }).processNoWarningAlert('sanksiketerlambatan');
                }

            },
            cancel: function () {
                var f = me.getFormsanksiketerlambatan();
                var vs = f.getForm().getValues();

                var ids = "";

                me.getGridsanksiketerlambatan().getStore().each(function (rec) {

                    if (rec != null) {
                        ids += rec.get("employee_id") + "~";
                    }

                });



                vs["ids"] = ids;

                vs["projectptid_opsi"] = projectptid_opsi;

                sanksiketerlambatan_id = f.down('[name=sanksiketerlambatan_id]').getValue();
                proses = f.down('[name=proses]').getValue();
                cancel = f.down('[name=cancel]').getValue();


                if(sanksiketerlambatan_id && proses == 1 && cancel == 0 && ids == ''){
                    if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
                        me.tools.alert.warning("Year is required");
                        return false;
                    } else {
                        periode = f.down('[name=periode]').getValue();
                    }

                    if(f.down('[name=periode_month]').getValue() == '' || f.down('[name=periode_month]').getValue() == null){
                        me.tools.alert.warning("Month is required");
                        return false;
                    } else {
                        periode_month = f.down('[name=periode_month]').getValue();
                    }

                    if(f.down('[name=amount]').getValue() == '' || f.down('[name=amount]').getValue() == null){
                        me.tools.alert.warning("Pengurangan Cuti is required");
                        return false;
                    } else {
                        amount = f.down('[name=amount]').getValue();
                    }

                    if(f.down('[name=description]').getValue() == '' || f.down('[name=description]').getValue() == null){
                        me.tools.alert.warning("Description is required");
                        return false;
                    } else {
                        description = f.down('[name=description]').getValue();
                    }

                    Ext.Msg.confirm('Confirm', "Sanksi Keterlambatan ini sudah pernah di proses & anda menghapus semua employeenya, saat anda proses ini berarti Sanksi Keterlambatan ini akan langsung dicancel karena employeenya kosong.", function (btn) {
                        if (btn == 'yes') {
                            f.setLoading("Proses sanksi keterlambatan...");
                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'periode': periode,
                                        'periode_month': periode_month,
                                        'amount': amount,
                                        'description': description,
                                        'sanksiketerlambatan_id': sanksiketerlambatan_id,
                                    },
                                    success: function (data, model) {
                                        var hasil = data.others[0][0]['hasil'][0][0]['result'];
                                        var msg = data.others[0][0]['msg'];
                                        console.log(msg);
                                    }
                            }).read('saveheader_sanksiketerlambatan');
                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'periode': periode,
                                        'periode_month':periode_month,
                                        'amount': amount,
                                        'description': description,
                                        'sanksiketerlambatan_id': sanksiketerlambatan_id,
                                    },
                                    success: function (data, model) {
                                        var hasil = data.others[0][0]['HASIL'];
                                        var msg = data.others[0][0]['MSG'];
                                        f.setLoading(false);
                                        f.up("window").close();
                                        me.tools.alert.info(msg);
                                    }
                            }).read('savebutcancel_sanksiketerlambatan');
                        }
                    });
                }else{
                    f.up("window").close();
                }
            },
            removeEmployee: function () {

                var f = me.getFormsanksiketerlambatan();
                var g = me.getGridsanksiketerlambatan();
                var recs = g.getSelectionModel().getSelection();
                var s = g.getStore();
                var selectedCount = 0;
                var cTotal = s.getCount();
                if (recs.length > 0) {

                    var countarray  = recs.length;
                    var counter     = 0;

                    var sanksiketerlambatan_id = f.down("[name=sanksiketerlambatan_id]").getValue();
                    var proses = f.down('[name=proses]').getValue();
                    var cancel = f.down('[name=cancel]').getValue();

                    var amount = f.down('[name=amount]').getValue();
                    var description = f.down('[name=description]').getValue();
                    var periode = f.down('[name=periode]').getValue();

                    // for (var i in recs) {
                    //     selectedCount++;
                    //     s.remove(recs[i]);
                    // }
                    // this.updateJumlah();



                    for (var i = 0; i < recs.length; i++) {

                        me.tools.ajax({
                                params: {
                                    'projectptid_opsi':projectptid_opsi,
                                    'sanksiketerlambatan_id': sanksiketerlambatan_id,
                                    'employee_id'   : recs[i]['data'].employee_id,
                                    'proses': proses,
                                    'cancel': cancel,
                                    'amount': amount,
                                    'description': description,
                                    'periode': periode,
                                },
                                success: function (data, model) {
                                    counter++;
                                    if (countarray == counter) {

                                        var detailGrid = me.getGridsanksiketerlambatan();
                                        
                                        detailGrid.doInit();
                                        detailGrid.getStore().load({
                                                params: {
                                                    'sanksiketerlambatan_id': sanksiketerlambatan_id,
                                                    'projectptid_opsi':projectptid_opsi,
                                                },
                                                callback: function (recs, op) {
                                                        detailGrid.attachModel(op);
                                                        
                                                        detailGrid.up("form").down("#labelJumlah").setText("Jumlah karyawan terpilih: " + detailGrid.getStore().getCount());
                                                }
                                        });

                                    }
                                }
                        }).read('removeemployee_sanksiketerlambatan');

                    }

                } else {
                    me.tools.alert.warning("Tidak ada karyawan terpilih");
                }

                // console.log(recs);
            },
            addEmployee: function () {

                var f = me.getFormsanksiketerlambatan();

                if(f.down('[name=periode]').getValue() == '' || f.down('[name=periode]').getValue() == null){
                    me.tools.alert.warning("Year is required");
                    return false;
                } else {
                    periode = f.down('[name=periode]').getValue();
                }

                if(f.down('[name=periode_month]').getValue() == '' || f.down('[name=periode_month]').getValue() == null){
                    me.tools.alert.warning("Month is required");
                    return false;
                } else {
                    periode_month = f.down('[name=periode_month]').getValue();
                }

                if(f.down('[name=amount]').getValue() == '' || f.down('[name=amount]').getValue() == null){
                    me.tools.alert.warning("Pengurangan Cuti is required");
                    return false;
                } else {
                    amount = f.down('[name=amount]').getValue();
                }

                if(f.down('[name=description]').getValue() == '' || f.down('[name=description]').getValue() == null){
                    me.tools.alert.warning("Description is required");
                    return false;
                } else {
                    description = f.down('[name=description]').getValue();
                }

                var sanksiketerlambatan_id = f.down("[name=sanksiketerlambatan_id]").getValue();

                if(sanksiketerlambatan_id){
                    me.addDetailSanksiKeterlambatan('create');
                }else{
                    me.tools.ajax({
                        params: {
                            'projectptid_opsi':projectptid_opsi,
                            'periode': periode,
                            'periode_month': periode_month,
                            'amount': amount,
                            'description': description,
                            'sanksiketerlambatan_id':sanksiketerlambatan_id
                        },
                        success: function (data, model) {
                            var hasil = data.others[0][0]['hasil'][0][0]['result'];
                            var msg = data.others[0][0]['msg'];

                            if(hasil >= 1 && msg == 'success'){
                                f.down("[name=sanksiketerlambatan_id]").setValue(hasil);
                                me.addDetailSanksiKeterlambatan('create');
                            }
                        }
                    }).read('saveheader_sanksiketerlambatan');
                }


            },
            updateJumlah: function () {

                me.getGridsanksiketerlambatan().up("form").down("#labelJumlah").setText("Jumlah karyawan terpilih: " + me.getGridsanksiketerlambatan().getStore().getCount());
            },
            view: function () {

                var g = me.getGridsanksiketerlambatan();
                var s = g.getStore();
                var cTotal = s.getCount();

                var f = me.getFormsanksiketerlambatan();
                var sanksiketerlambatan_id = f.down("[name=sanksiketerlambatan_id]").getValue();

                if(sanksiketerlambatan_id){
                    // Ext.Msg.confirm('Confirm', "Silahkan selesaikan dahulu ", function (btn) {
                    //     if (btn == 'yes') {
                    //     }
                    // });
                    me.tools.alert.warning("Silahkan selesaikan & proses dahulu form sanksi keterlambatan anda.");
                    return false;
                }else{
                    me.instantWindow("Panel", 900, "View Log", "create", "sanksiketerlambatanviewLookup", "lookup.sanksiketerlambatanview", {
                        itemId: me.controllerName + 'viewlog'
                    });
                    me.lookupViewlogSanksiKeterlambatan();
                }
                
            }
        };
        return x;
    },
    addDetailSanksiKeterlambatan: function (state) {
        var me = this;      
        var window = me.instantWindow("Panel", 900, "Employee", "create", "sanksiketerlambatanLookup", "lookup.sanksiketerlambatan", {
                    itemId: me.controllerName + 'employee'
            });

        f = me.getFormsearchlookupsk();
        this.lookupEmployeeSanksiKeterlambatan();
    },
    lookupEmployeeSanksiKeterlambatan: function(){
            var me, form, department_id, grid, vs;
            me = this;
            var f = me.getFormsanksiketerlambatan();
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();

            form = me.getFormsearchlookupsk();

            var vs = form.getValues();
            
            if(vs['employee_nik'] == null){
               employee_nik = 0;
            } else {
               employee_nik = vs['employee_nik'];
            }

            if(vs['employee_name']==null){
               employee_name = 0;
            }else{
               employee_name = vs['employee_name'];
            }

            if(vs['department_id']==null){
               department_id = 0;
            }else{
               department_id = vs['department_id'];
            }

            grid = me.getGridlookupsk();
            grid.setLoading("Please wait...");
            var sanksiketerlambatan_id = f.down("[name=sanksiketerlambatan_id]").getValue();
            var periode = f.down("[name=periode]").getValue();
            var periode_month = f.down("[name=periode_month]").getValue();
            me.tools.ajax({
                    params: {
                            'sanksiketerlambatan_id':sanksiketerlambatan_id,
                            'employee_nik': employee_nik,
                            'employee_name': employee_name,
                            'department_id': department_id,
                            'projectptid_opsi':projectptid_opsi,
                            'periode': periode,
                            'periode_month':periode_month
                    },
                    success: function(data, model) {
                            me.tools.wesea({data: data, model: model}, grid).grid();
                            grid.setLoading(false);
                    }
            }).read('employeelist_sanksiketerlambatan');
    },
    selectEmployeeSanksiKeterlambatan: function () {
        var me, grid, rows, data, row, counter, countarray, act_name, fields, kelompokabsensi_id;
        me = this;
        grid = me.getGridlookupsk();
        rows = grid.getSelectionModel().getSelection();
        var f = me.getFormsanksiketerlambatan();
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();

        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {

                var p = grid.up("window").down("panel");
                p.setLoading("Please wait...");

                countarray  = rows.length;
                counter     = 0;
            var sanksiketerlambatan_id = f.down("[name=sanksiketerlambatan_id]").getValue();

        for (var i = 0; i < rows.length; i++) {
                    
                    //data["details"] = me.getGriddetail().getJson();
                    me.tools.ajax({
                            params: {
                                'projectptid_opsi':projectptid_opsi,
                                'sanksiketerlambatan_id': sanksiketerlambatan_id,
                                'employee_id'   : rows[i]['data'].employee_id,
                                'total_late'   : rows[i]['data'].total_late,
                                'avg_late'   : rows[i]['data'].avg_late
                            },
                            success: function (data, model) {
                                counter++;
                                if (countarray == counter) {

                                    var detailGrid = me.getGridsanksiketerlambatan();
                                    
                                    detailGrid.doInit();
                                    detailGrid.getStore().load({
                                            params: {
                                                'sanksiketerlambatan_id': sanksiketerlambatan_id,
                                                'projectptid_opsi':projectptid_opsi,
                                            },
                                            callback: function (recs, op) {
                                                    detailGrid.attachModel(op);
                                                    grid.up("window").close();
                                                    p.setLoading(false);
                                                    
                                                    detailGrid.up("form").down("#labelJumlah").setText("Jumlah karyawan terpilih: " + detailGrid.getStore().getCount());
                                            }
                                    });

                                }
                            }
                    }).read('selectemployee_sanksiketerlambatan');

                }

        }
    },
    lookupViewlogSanksiKeterlambatan: function(){
            var me, form, grid, vs;
            me = this;
            var f = me.getFormsanksiketerlambatan();
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();

            form = me.getFormsearchlookupskv();

            var vs = form.getValues();
            
            if(vs['periode'] == null){
               periode = 0;
            } else {
               periode = vs['periode'];
            }

            if(vs['periode_month']==null){
               periode_month = 0;
            }else{
               periode_month = vs['periode_month'];
            }

            if(vs['description']==null){
               description = 0;
            }else{
               description = vs['description'];
            }

            grid = me.getGridlookupskv();
            grid.setLoading("Please wait...");

            me.tools.ajax({
                    params: {
                            'periode':periode,
                            'periode_month': periode_month,
                            'description': description,
                            'projectptid_opsi':projectptid_opsi
                    },
                    success: function(data, model) {
                            me.tools.wesea({data: data, model: model}, grid).grid();
                            grid.setLoading(false);
                    }
            }).read('loglist_sanksiketerlambatan');
    },
    viewemployeeViewlogSanksiKeterlambatan: function(){
            var me, form, grid, vs;
            me = this;
            grid = me.getGridlookupskv();
            rows = grid.getSelectionModel().getSelection();
            var f = me.getFormsanksiketerlambatan();
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
            
            if (rows.length < 1) {
                Ext.Msg.alert('Info', 'No record selected..!');
                return;
            } else {
                if (rows.length > 1) {
                    Ext.Msg.alert('Info', 'Silahkan pilih 1 record..!');
                    return;
                } else {

                    var p = grid.up("window").down("panel");
                    p.setLoading("Please wait...");
                    
                    countarray  = rows.length;
                    counter     = 0;
                    
                    // if(rows[0].data.cancel == 1){

                        // var w = me.instantWindow("FormCutiTambahanView", 600, "View Employee", "view", "absentrecordformcutitambahanview");
                        for (var i = 0; i < rows.length; i++) {

                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'sanksiketerlambatan_id': rows[i]['data'].sanksiketerlambatan_id,
                                    },
                                    success: function (data, model) {
                                        var w = me.instantWindow("FormSanksiKeterlambatanView", 600, "View Employee", "view", "absentrecordformsanksiketerlambatanview");
                                        var fv = me.getFormsanksiketerlambatanview();
                                        var gv = me.getGridsanksiketerlambatanview();
                                        me.tools.wesea({data: data, model: model}, gv).grid();
                                        fv.down("#labelJumlahView").setText("Jumlah karyawan terpilih: " + gv.getStore().getCount());
                                        p.setLoading(false);

                                    }
                            }).read('viewemployee_sanksiketerlambatan');

                            // var detailGrid = me.getGridcutitambahanview();
                                            
                            // detailGrid.doInit();
                            // detailGrid.getStore().load({
                            //     params: {
                            //         'extraleave_id': rows[i]['data'].extraleave_id,
                            //         'projectptid_opsi':projectptid_opsi,
                            //     },
                            //     callback: function (recs, op) {
                            //             detailGrid.attachModel(op);
                                                                        
                            //             detailGrid.up("form").down("#labelJumlahView").setText("Jumlah karyawan terpilih: " + detailGrid.getStore().getCount());
                            //             p.setLoading(false);
                            //     }
                            // });

                        }

                    // }else{
                    //     me.editprosesViewlog();
                    // }


                }
            }
    },
    editprosesViewlogSanksiKeterlambatan: function(){
            var me, form, grid, vs, rows;
            me = this;
            var grid = me.getGridlookupskv();
            var rows = grid.getSelectionModel().getSelection();
            var f = me.getFormsanksiketerlambatan();
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
            
            if (rows.length < 1) {
                Ext.Msg.alert('Info', 'No record selected..!');
                return;
            } else {
                if (rows.length > 1) {
                    Ext.Msg.alert('Info', 'Silahkan pilih 1 record..!');
                    return;
                } else {

                    if(rows[0].data.cancel == 1){

                        Ext.Msg.alert('Info', 'Record jika sudah di cancel, tidak bisa di edit..');
                        return;

                    }else{
                        var p = grid.up("window").down("panel");
                        p.setLoading("Please wait...");

                        var countarray  = rows.length;
                        var counter     = 0;

                        for (var i = 0; i < rows.length; i++) {

                            me.tools.ajax({
                                    params: {
                                        'projectptid_opsi':projectptid_opsi,
                                        'sanksiketerlambatan_id': rows[i]['data'].sanksiketerlambatan_id,
                                    },
                                    success: function (data, model) {
                                        
                                        f.down("[name=sanksiketerlambatan_id]").setValue(data['others'][0][0]['HASIL']['sanksiketerlambatan_id']);
                                        f.down("[name=proses]").setValue(data['others'][0][0]['HASIL']['proses']);
                                        f.down("[name=cancel]").setValue(data['others'][0][0]['HASIL']['cancel']);

                                        f.down("[name=periode]").setValue(data['others'][0][0]['HASIL']['periode']);
                                        f.down("[name=periode]").setReadOnly(true);
                                        f.down("[name=periode_month]").setValue(data['others'][0][0]['HASIL']['periode_month']);
                                        f.down("[name=periode_month]").setReadOnly(true);
                                        f.down("[name=amount]").setValue(data['others'][0][0]['HASIL']['amount']);
                                        f.down("[name=amount]").setReadOnly(true);
                                        f.down("[name=description]").setValue(data['others'][0][0]['HASIL']['description']);
                                        f.down("[name=description]").setReadOnly(true);

                                        var detailGrid = me.getGridsanksiketerlambatan();
                                        
                                                    detailGrid.doInit();
                                                    detailGrid.getStore().load({
                                                            params: {
                                                                'sanksiketerlambatan_id': data['others'][0][0]['HASIL']['sanksiketerlambatan_id'],
                                                                'projectptid_opsi':projectptid_opsi,
                                                            },
                                                            callback: function (recs, op) {
                                                                    detailGrid.attachModel(op);
                                                                    
                                                                    detailGrid.up("form").down("#labelJumlah").setText("Jumlah karyawan terpilih: " + detailGrid.getStore().getCount());
                                                            }
                                                    });


                                        grid.up("window").close();
                                        p.setLoading(false);
                                    }
                            }).read('editproses_sanksiketerlambatan');

                        }

                    }

                }
            }
    },
    cancelprosesViewlogSanksiKeterlambatan: function(){
            var me, form, grid, vs;
            me = this;
            grid = me.getGridlookupskv();
            rows = grid.getSelectionModel().getSelection();
            var f = me.getFormsanksiketerlambatan();
            var fs = me.getFormsearch();
            var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
            
            if (rows.length < 1) {
                Ext.Msg.alert('Info', 'No record selected..!');
                return;
            } else {
                if (rows.length > 1) {
                    Ext.Msg.alert('Info', 'Silahkan pilih 1 record..!');
                    return;
                } else {

                    if(rows[0].data.cancel == 1){

                        Ext.Msg.alert('Info', 'Sanksi Keterlambatan sudah di cancel prosesnya, Silahkan pilih yang lain!');
                        return;

                    }else{
                        var p = grid.up("window").down("panel");

                        countarray  = rows.length;
                        counter     = 0;

                        Ext.Msg.confirm('Confirm', "Cuti akan ditarik kembali. Apakah anda yakin ingin cancel proses ini ?", function (btn) {
                            if (btn == 'yes') {
                                p.setLoading("Please wait...");
                                for (var i = 0; i < rows.length; i++) {
                                    if(rows[i]['data'].cancel == 1){
                                        p.setLoading(false);
                                        
                                        setTimeout(function(){  
                                            me.tools.alert.warning("Sanksi Keterlambatan sudah di cancel prosesnya, Silahkan pilih yang lain!");
                                            return false;
                                        }, 100);
                                    }else{
                                        me.tools.ajax({
                                                params: {
                                                    'projectptid_opsi':projectptid_opsi,
                                                    'sanksiketerlambatan_id': rows[i]['data'].sanksiketerlambatan_id,
                                                },
                                                success: function (data, model) {
                                                    if (data['others'][0][0]['MSG']) {
                                                        me.tools.alert.info("Success");
                                                    }else{
                                                        me.tools.alert.info("Something problem..");
                                                    }

                                                    me.tools.ajax({
                                                            params: {
                                                                    'periode':0,
                                                                    'periode_month': 0,
                                                                    'description': '',
                                                                    'projectptid_opsi':projectptid_opsi
                                                            },
                                                            success: function(data, model) {
                                                                    me.tools.wesea({data: data, model: model}, grid).grid();
                                                                    f.down("[name=sanksiketerlambatan_id]").setValue('');
                                                                    f.down("[name=proses]").setValue('1');
                                                                    f.down("[name=cancel]").setValue('');

                                                                    var year = new Date().getFullYear();
                                                                    f.down("[name=periode]").setValue(year);
                                                                    var month = new Date().getMonth()+1;
                                                                    f.down("[name=periode_month]").setValue(month);
                                                                    f.down("[name=amount]").setValue('');
                                                                    f.down("[name=description]").setValue('');

                                                                    f.down("[name=periode]").setReadOnly(false);
                                                                    f.down("[name=periode_month]").setReadOnly(false);
                                                                    f.down("[name=amount]").setReadOnly(false);
                                                                    f.down("[name=description]").setReadOnly(false);

                                                                    f.up("window").close();

                                                            }
                                                    }).read('loglist_sanksiketerlambatan');

                                                    p.setLoading(false);

                                                }
                                        }).read('cancelproses_sanksiketerlambatan');

                                    }

                                }

                            }
                        });

                    }
                    
                }
            }
    },
    // end added by Michael 2021.07.16 
    
    modeTransferOnSelect: function () {
        var me = this;
        var f = me.getFormtransfer();
        var vs = f.getForm().getValues();
        var m = vs['mode_transfer'];
        //console.log(vs['mode_transfer']);
        f.down("#file_csvabsent").hide();
        f.down("#transferDateID").hide();
        f.down("[name=delete]").hide();
        f.down("[action=process]").hide();
        
        // added by Wulan Sari 21.04.2018        
        f.down("[name=description_format]").hide();
        
        
        if (m === "C") {
            f.down("#file_csvabsent").show(); 
            
            // added by Wulan Sari 21.04.2018    
            f.down("[name=description_format]").show();
            
            
        } else if (m === "D" || m === "T") {
            //  f.down("#file_csvabsent").show();
            f.down("#transferDateID").show();
            f.down("[name=delete]").show();
            f.down("[action=process]").show();
        }
    },
    formAbsentCsvUpload: function (fld, a, mode) {
        var me = this;


        var me = this;
        // added by Michael 2021.05.19 
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19 

        var form = fld.up("form");
        var p = me.getPanel();
        me.uploadFile({
            form: form,
            showalert: false,
            params: {'type': 'csv'},
            callback: {
                success: function (fn) {

                    //form.up("window").close();


                    form.setLoading("Transfering absent from csv...");

                    me.tools.ajax({
                        params: {
                            file_name: fn,
                            start_day: 0,
                            end_day: 0,
                            is_delete: 0,
                            // added by Michael 2021.05.19 
                            projectptid_opsi: projectptid_opsi
                            // end added by Michael 2021.05.19 
                        },
                        autoAbort: true,
                        success: function (data, model) {

                            if (data['others'][0][0]['STATUS']) {
                                // me.tools.alert.info("Success transfer");
                                me.fpnl = data['others'][0][0]['FPNUMBERLIST'];//FPNUMBERLIST
                                p.setLoading(false);

                                me.transferAjax(form, 1, me.fpnl.length);

                            } else {
                                me.tools.alert.warning(data['others'][0][0]['ERRORMSG']);
                                form.setLoading(false);

                            }

                            //  f.setLoading(false);
                            //f.up("window").close();
                        }

                    }).read('transferinfocsv');


                },
                failure: function () {
                    p.setLoading(false);
                }
            }
        });
    },
    showShifExcelForm: function () {
        var me = this;
        var w = me.instantWindow("FormShiftExcel", 400, "Shift from Excel", "processexcel", "toolShiftExcelWinId");
        var f = w.down("form");

    },
    formShiftExcelUpload: function (fld, a, mode) {
        var me = this;

        /*  me.tools.ajax({
         params: {
         },
         success: function(data, model) {
         
         
         }
         }).read('testexcel');
         
         
         return;
         */
        var me = this;
        var form = fld.up("form");
        var p = me.getPanel();

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.uploadImage({
            form: form,
            showalert: false,
            callback: {
                success: function (fn) {
                    //  me.refreshPhotoInfo(imageName);
                    form.up("window").close();
                    me.getFormshift().up("window").close();
                    p.setLoading("Update tipe shift...");
                    me.tools.ajax({
                        params: {
                            file_name: fn,
                            month: me.getSelectedMonth(),
                            year: me.getSelectedYear(),
                            // added by Michael 2021.05.19
                            projectptid_opsi: projectptid_opsi
                            // end added by Michael 2021.05.19
                        },
                        success: function (data, model) {
                            p.setLoading(false);
                            if (data['others'][0][0]['HASIL']) {
                                me.tools.alert.info("Success");
                            } else {
                                me.tools.alert.warning(data['others'][0][0]['MSG']);
                            }


                        }
                    }).read('shifttypeexcel');
                },
                failure: function () {
                    p.setLoading(false);
                }
            }
        });


    },
    fixDate: function () {
        var me = this;
        var p = me.getPanel();
        p.setLoading(true);
        me.tools.ajax({
            params: {
                month: me.getSelectedMonth(),
                year: me.getSelectedYear()
            },
            success: function (data, model) {
                if (data['others'][0][0]['HASIL']) {
                    me.tools.alert.info("Success");
                } else {
                    me.tools.alert.error("Error.");
                }
                p.setLoading(false);
            }
        }).read('fixdate');
    },
    timeProcessOnClickAbsRecClicked: false,
    timeProcessOnClickAbsRec: function () {

        var me = this;
        if (me.timeProcessOnClickAbsRecClicked) {
            return;
        }
        var tools = new Hrd.library.absentrecord.Tools();
        var f = me.getFormtime();

        var rec = me.getGrid().getSelectedRecord();
        var data = {};
        var timeIn = f.down("[name=time_in]").getValue();
        var timeOut = f.down("[name=time_out]").getValue();
        var zoneIn = tools.getTimeZone(timeIn, true);
        var zoneOut = tools.getTimeZone(timeOut, false);
        if (zoneIn) {
            data[zoneIn] = f.down("[name=time_in]").getValue();
        } else {
            console.log("Tidak ada data in");
        }
        if (zoneOut) {
            data[zoneOut] = f.down("[name=time_out]").getValue();
        } else {
            console.log("gak ada data out");
        }

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        if (rec) {
            me.timeProcessOnClickAbsRecClicked = true;
            //updatetime
            f.setLoading("Updating...");
            data = f.getForm().getValues();
            data["employee_id"] = me.getSelectedEmployee().get("employee_employee_id");
            data["month"] = me.getSelectedMonth();
            data["year"] = me.getSelectedYear();
            data["day"] = rec.get("day");

            data['time_in'] = timeIn;
            data['time_out'] = timeOut;
            data['shifttype_shifttype_id'] = rec.get("shifttype_shifttype_id");
            
            // added by Michael 2021.05.19
            data['projectptid_opsi'] = projectptid_opsi;
            // end added by Michael 2021.05.19

            me.tools.ajax({
                params: data,
                success: function (data, model) {

                    if (data['others'][0][0]['HASIL']) {
                        me.tools.alert.info("Success");
                    } else {
                        me.tools.alert.warning(data['others'][0][0]['MSG']);
                    }
                    f.setLoading(false);
                    f.up("window").close();
                    me.emGrid().select();
                    me.timeProcessOnClickAbsRecClicked = false;

                }
            }).read('updatetime');
        } else {
            console.log("gak ada data");
        }

    },
    tlkProcessOnClicked: false,
    tlkProcessOnClick: function () {
        var me = this;
        var f = me.getFormtlk();
        // var g = f.down("grid");
        // var rec = g.getSelectedRecord();



        var data = f.getForm().getValues();
        if (!data['parametertlk_id']) {
            data['parametertlk_id'] = 0;
        }
        //data['parametertlk_id'] = rec ? rec.get('parametertlk_id') : 0;

        // me.tools.hermes(f).save(data, 'createtlk');
        if (me.tlkProcessOnClicked) {
            return;
        }

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        data['projectptid_opsi'] = projectptid_opsi;
        // end added by Michael 2021.05.19

        me.tlkProcessOnClicked = true;

        me.tools.ajax({
            params: data,
            success: function (data, model) {

                if (data['others'][0][0]['HASIL']) {
                    me.tools.alert.info("Success");
                } else {
                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                }
                f.setLoading(false);
                f.up("window").close();
                me.emGrid().select();
                me.tlkProcessOnClicked = false;

            }
        }).read('createtlk');


    },
    reasonProcessOnClick: function () {
        var me = this;

        var emIndex = -1;
        var ge = me.getGridemployee();
        emIndex = ge.getStore().indexOf(ge.getSelectedRecord());

        if (emIndex < 0) {
            return;
        }




        var f = me.getFormreason();
        var data = f.getForm().getValues();
        var at = f.down("[name=absenttype_absenttype_id]");
        var sat = at.getStore();
        var sab = me.getGrid(); // grid absent record
        var absenttypeId = me.tools.intval(sab.getSelectedRecord().get("absenttype_absenttype_id"));



        /// jika tipe alasan tidak hadir termasuk tipe potong cuti
        /// hanya berlaku untuk pembuatan absenttype yang baru.
        if (at.getValue() > 0 && absenttypeId == 0) {
            var index = sat.findExact('absenttype_id', at.getValue());

            console.log(sat.getAt(index).get('is_cutleave'));

            if (sat.getAt(index).get('is_cutleave') === 1) {
                /// cek jika ada hak cuti yang terpilih
                var gjc = me.getGridjatahcuti();
                var row = gjc.getSelectedRow();

                /*
                 if (row < 0) {
                 me.tools.alert.warning("Silahkan pilih salah satu hak cuti yang ingin dikurangi.");
                 return;
                 }
                 
                 
                 
                 
                 
                 
                 hakCutiId = gjc.getStore().getAt(row).get("leaveentitlements_id");
                 data["leaveentitlements_id"] = hakCutiId;
                 
                 */


            }
        }











        if (at.getValue() > 0) {
            var atg = sat.getAt(sat.findExact('absenttype_id', at.getValue())).get('absenttypegroup_absenttypegroup_id');
            // console.log(atg);
            //  console.log(at.getValue());
            data["absenttypegroup_absenttypegroup_id"] = atg;
            data["absenttype_code"] = sat.getAt(sat.findExact('absenttype_id', at.getValue())).get('code');
        } else {
            me.tools.alert.warning("Silahkan pilih alasan tidak hadir terlebih dahulu.");
            return;
        }

        f.setLoading("Saving your data");
        
        // added by Wulan Sari 2018.06.05
        data["note"] = data["note"].replace(/["']/g, " ");

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        data['projectptid_opsi'] = projectptid_opsi;
        // end added by Michael 2021.05.19
        
        me.tools.ajax({
            params: data,
            success: function (data, model) {
                console.log(data);
                if (data['others'][0][0]['HASIL']) {
                    me.tools.alert.info("Success");
                    f.up("window").close();
                    me.getGridemployee().getSelectionModel().select(emIndex);
                } else {
                    me.tools.alert.warning(data['others'][0][0]['MSG']);
                }
                f.setLoading(false);
            }
        }).read('createreason');

    },
    isCutiChange: function () {
        var me = this;
        var f = me.getFormreason();
        var s = f.down("[name=absenttype_absenttype_id]").getStore();
        // filter untuk tipe cuti saja

        var idGroupLeave = me.globalParams['ABSENTTYPEGROUP_LEAVE'];
        var v = f.down("[name=is_cuti]").getValue();
        s.clearFilter();

        if (v === false)
            return false;

        if (s.getCount() > 0 && idGroupLeave > 0) {

            f.down("[name=absenttype_absenttype_id]").setValue(false);
            me.tools.filter(s, 'absenttypegroup_absenttypegroup_id', idGroupLeave);

            /*
             s.filterBy(function(rec, id) {
             
             if (rec.raw.absenttypegroup_absenttypegroup_id === idGroupLeave) {
             return true;
             }
             else {
             return false;
             }
             });
             
             */
        }
    },
    gridTimeItemClick: function (index) {
        var me = this;
        var rec = me.getGrid().getStore().getAt(index);


        me.instantWindow("FormTime", 600, "Time", "processtime", "toolProcessTimeWinId");


        var f = me.getFormtime();

        console.log(rec);
        if (!rec) {
            console.log("Tidak ada absent sheet yang terpilih");
            return;
        }
        f.down("[name=absentdetail_id]").setValue(rec.get("absentdetail_id"));

        // set default time in dan time out

        var timeIn = {}, timeOut = {};
        timeIn['A'] = me.tools.dateFunc(rec.get('in_7_14')).toHIS();
        timeIn['B'] = me.tools.dateFunc(rec.get('in_15_21')).toHIS();
        timeIn['C'] = me.tools.dateFunc(rec.get('in_22_6')).toHIS();
        timeOut['A'] = me.tools.dateFunc(rec.get('out_7_14')).toHIS();
        timeOut['B'] = me.tools.dateFunc(rec.get('out_15_21')).toHIS();
        timeOut['C'] = me.tools.dateFunc(rec.get('out_22_6')).toHIS();

        /// check yang ada datannya
        var fixTimeIn = false;
        var fixTimeOut = false;


        for (var i in timeIn) {
            if (!fixTimeIn) {
                if (me.tools.timeToDecimal(timeIn[i]) > 0) {
                    fixTimeIn = timeIn[i];
                }
            }

        }

        for (var i in timeOut) {
            if (!fixTimeOut) {
                if (me.tools.timeToDecimal(timeOut[i]) > 0) {
                    fixTimeOut = timeOut[i];
                }
            }

        }

        if (fixTimeIn) {
            f.down("[name=time_in]").setValue(fixTimeIn);
        }

        if (fixTimeOut) {
            f.down("[name=time_out]").setValue(fixTimeOut);
        }


        f.down("[name=description]").setValue(rec.get('description'));
        f.down("[name=attendance_total]").setValue(rec.get('attendance_total'));
        f.down("[name=transport_total]").setValue(rec.get('transport_total'));


    },
    gridTlkItemClick: function (index) {
        var me = this;

        var rec = me.getGrid().getStore().getAt(index);

        me.instantWindow("FormTlk", 600, "TLK", "processtlk", "toolProcessTlkWinId");

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        var f = me.getFormtlk();
        // var sg = f.down("grid");
        // sg.getSelectionModel().setSelectionMode('SINGLE');
        var w = f.up("window");
        f.setLoading("Please wait..");
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi:projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {


                me.tools.wesea(data.parametertlk, f.down("[name=parametertlk_id]")).comboBox();

                /*
                 me.tools.wesea({
                 data: data,
                 model: model
                 }, sg).grid();
                 */

                var recE = me.getSelectedEmployee();

                if (recE) {
                    f.down("[name=employee_employee_id]").setValue(recE.get("employee_employee_id"));
                }


                /// set default date
                if (rec) {
                    var date = new Date();
                    date.setFullYear(me.getSelectedYear());
                    date.setMonth(me.getSelectedMonth() - 1);
                    date.setDate(rec.get('day'));
                    f.down("[name=start_date]").setValue(date);
                    f.down("[name=end_date]").setValue(date);


                    /// jika sudah ada onduty
                    console.log(rec);
                    var onDutyId = rec.get('parametertlk_parametertlk_id');
                    console.log("onduty id: " + onDutyId);
                    f.down("[name=parametertlk_id]").setValue(onDutyId);
                    f.down("[name=tlk_project_type]").setValue(rec.get('tlk_project_type'));
                    // var index = sg.getStore().findExact('parametertlk_id', onDutyId);
                    // if (index >= 0) {
                    // sg.getSelectionModel().select(index);
                    // }

                    f.down("[name=tlk_other]").setValue(rec.get("tlk_other"));
                }


                f.setLoading(false);
            }
        }).read('tlklist');
    },
    gridReasonItemClick: function (index) {
        var me = this;
         // console.log(me.getGrid().getColumnModel());
        var rec = me.getGrid().getStore().getAt(index);
        console.log(index);
        //Hrd.view.absentrecord.FormReason
        me.instantWindow("FormReason", 600, "Alasan Tidak Hadir", "processreason", "toolProcessReasonWinId");

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        var f = me.getFormreason();
        var w = f.up("window");
        f.setLoading("Please wait..");
        me.reasonDeleteClick = false;
        me.tools.ajax({
            params: {
                leave_id: rec.get("leave_leave_id")
            },
            success: function (data, model) {
                //added by anas 23112021
                //Cek index untuk CUTI EXTRA
                var removeIndex = data.absenttype.data.findIndex(item => item.absenttype == "CUTI EXTRA");
                //Remove CUTI EXTRA dari combobox
                data.absenttype.data.splice( removeIndex, 1 );
                //end added by anas
                
                me.tools.wesea(data.absenttype, f.down("[name=absenttype_absenttype_id]")).comboBox();
                
                me.isCutiChange();
                
                // wulan edit 20190730
                if(rec.get("leave_leave_id")){
                    f.down("[name=is_cuti]").setValue(true);
                    f.down('#btnProcess').setDisabled(true);
                } else {
                    f.down("[name=is_cuti]").setValue(false);  
                    f.down('#btnProcess').setDisabled(false);                  
                }
                // end wulan edit 20190730
                
                me.globalParams['ABSENTTYPEGROUP_LEAVE'] = me.tools.intval(data.others[0][0]['ABSENTTYPEGROUP_LEAVE']);
                me.globalParams['ABSENTTYPEGROUPCODE_LEAVE'] = data.others[0][0]['ABSENTTYPEGROUPCODE_LEAVE'];
                /// set default date
                if (rec) {
                    var date = new Date();
                    date.setFullYear(me.getSelectedYear());
                    date.setMonth(me.getSelectedMonth() - 1);
                    date.setDate(rec.get('day'));
                    f.down("[name=start_date]").setValue(date);
                    f.down("[name=end_date]").setValue(date);
                    f.down("[name=absentdetail_id]").setValue(rec.get("absentdetail_id"));
                    f.down("[name=absenttype_absenttype_id]").setValue(rec.get("absenttype_absenttype_id"));
                    f.down("[name=note]").setValue(rec.get("description"));

                    if (data.others[0][0]['CUTI']) {
                        f.down("[name=is_halfday]").setValue(data.others[0][0]['CUTI']['is_halfday'] == 0 ? '0' : '1');
                    }

                    //  f.down("[name=is_halfday]").setValue(rec.get("is_halfday"));

                }

                var recE = me.getSelectedEmployee();

                if (recE) {
                    f.down("[name=employee_employee_id]").setValue(recE.get("employee_employee_id"));
                }

                /// jatah cuti
                // f.setLoading("Mengambil informasi jatah cuti...");

                var gjc = me.getGridjatahcuti();
                gjc.getSelectionModel().setSelectionMode('SINGLE');
                gjc.doInit();
                gjc.doLoad({employee_employee_id: recE.get("employee_employee_id"), projectptid_opsi: projectptid_opsi}, function () {
                    f.setLoading(false);
                });

                /// /jatah cuti
                
                // added by Michael 2021.06.15 
                // modify by Michael 16/11/2021 | C-INS & #view_file_intranet_cuti
                f.down("#view_file_intranet").hide();
                f.down("#view_file_intranet_cuti").hide();

                if(rec.get("absenttype_code")){
                    if(rec.get("absenttype_code") == 'S-KD' || rec.get("absenttype_code") == 'S-TKD' || rec.get("absenttype_code") == 'C-INS'){
                        f.setLoading("Please wait..");
                        me.tools.ajax({
                            params: {
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                employee_employee_id: recE.get("employee_employee_id"), 
                                projectptid_opsi: projectptid_opsi,
                                absentdetail_id:rec.get("absentdetail_id")
                            },
                            success: function (data, model) {
                                var attachment = data.others[0][0].hasil[0].attachment;

                                if(attachment){
                                    f.down("[name=attachment]").setValue(attachment);
                                    // f.down("#view_file_intranet").show();

                                    // modify by Michael 16/11/2021
                                    if(rec.get("absenttype_code") == 'S-KD' || rec.get("absenttype_code") == 'S-TKD'){
                                        f.down("#view_file_intranet").show();
                                        f.down("#view_file_intranet_cuti").hide();
                                    }
                                    if(rec.get("absenttype_code") == 'C-INS'){
                                        f.down("#view_file_intranet_cuti").show();
                                        f.down("#view_file_intranet").hide();
                                    }
                                    // end modify by Michael 16/11/2021
                                }else{
                                    f.down("#view_file_intranet").hide();
                                    f.down("#view_file_intranet_cuti").hide();
                                }

                                setTimeout(function () {
                                    f.setLoading(false);
                                }, 5000);
                            }
                        }).read('getattachment');

                    }
                }
                // end added by Michael 2021.06.15 

            }
        }).read('detailreason');

    },
    // added by Michael 2021.06.15 
    formUploadFoto: function(fld, a, mode) {
        var me = this;

        if (me.uploadFotoKlik === 0) {
            var me = this;
            var form = me.getFormreason();
            var p = form.up("window");
            form.setLoading("Please wait..");

            me.uploadFile({
                form: form,
                showalert: false,
                params: {
                    "type": 'dokumen'
                  //  "nik": me.getFormdata().down("[name=employee_nik]").getValue(),
                   // "employee_id":me.getFormdata().down("[name=employee_id]").getValue()
                },
                callback: {
                    success: function(fn) {
                        p.setLoading(false);
                        //console.log(fn);
                      //  me.refreshPhotoInfo(fn);
                        me.uploadFotoKlik = 0;
                        form.down("[name=file_name_upload]").setValue(fn);
                        form.down("[name=attachment]").show();
                        form.down("[name=attachment]").setValue(fn);
                        form.down("#view_file_intranet").show();
                        console.log(fn);
                        form.setLoading(false);

                    },
                    failure: function() {
                        me.uploadFotoKlik = 0;
                        form.setLoading(false);
                    }
                }
            });
            
            me.uploadFotoKlik = 1;
        }

    },
    // end added by Michael 2021.06.15 
    mainPanelBeforeRender: function (configs) {
        this.callParent(arguments);
        this.addCSSRule(document.styleSheets[0], "weekend-row", "background-color:red !important:");
    },
    addCSSRule: function (sheet, selector, rules, index) {
        if ("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        } else if ("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    },
    toolExcel: function () {
        var me = this;

        var x = {
            form: function () {

                me.instantWindow("FormToolFileInput", 400, "Import from Excel", "processexcel", "toolProcessExcelWinId");

            },
            fileOnChange: function () {
                var that = this;
                var f = me.getFormexcel();
                var vs = f.getValues();

                that.uploadImage({
                    form: f,
                    callback: {
                        success: function (imageName) {
                            console.log(imageName);
                        },
                        failure: function () {

                        }
                    }
                });

            },
            uploadImage: function (params) {

                var form = params.form;
                var callback = params.callback;

                form.submit({
                    url: 'hrd/' + me.controllerName + '/read',
                    params: {
                        mode_read: 'uploadexcel'
                    },
                    waitMsg: 'Uploading file...',
                    success: function (f, a) {
                        var respon = a.result.data.others[0][0];
                        if (respon) {
                            me.tools.alert.info(respon.MSG);
                        }
                    },
                    failure: function (f, a) {
                        //  me.dataSave(me,dataForm);

                        callback.failure();
                        var msg = "...";
                        var respon = a.result.data.others[0][0];

                        if (respon) {
                            me.tools.alert.warning(respon.MSG);
                        }

                    }
                });
            }
        };
        return x;
    },
    toolTotalHourandLost: function () {
        var me = this;
        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        var x = {
            form: function () {

                me.instantWindow("FormToolProcessHourandLost", 400, "Process Hour and Lost Time", "processhal", "toolProcessHaLWinId");

            },
            processOnClick: function () {
                var f = me.getFormhal();
                var vs = f.getValues();
                var opt = vs["option"];
                var ajaxParams = {};
                var isValid = false;
                switch (opt) {
                    case "employee":
                        var emId = me.getSelectedEmployee();
                        if (emId) {
                            isValid = true;
                            ajaxParams = {
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                process: 'employee',
                                employee_id: emId.get("employee_employee_id"),
                                // added by Michael 2021.05.19
                                projectptid_opsi : projectptid_opsi
                                // added by Michael 2021.05.19
                            };
                        } else {
                            me.tools.alert.warning("Please select employee first");
                        }

                        break;
                    case "division":
                        var divId = me.getSelectedDepartment();
                        if (divId === 0 || divId === 999) {
                            me.tools.alert.warning("Please select department first");

                        } else {
                            isValid = true;
                            ajaxParams = {
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                process: 'department',
                                department_id: divId,
                                // added by Michael 2021.05.19
                                projectptid_opsi : projectptid_opsi
                                // added by Michael 2021.05.19
                            };
                        }
                        break;
                    case "all":
                        isValid = true;
                        ajaxParams = {
                            month: me.getSelectedMonth(),
                            year: me.getSelectedYear(),
                            process: 'all',
                            // added by Michael 2021.05.19
                            projectptid_opsi : projectptid_opsi
                            // added by Michael 2021.05.19
                        };
                        break;
                }
                if (isValid) {
                    f.setLoading("Processing...");
                    me.tools.ajax({
                        params: ajaxParams,
                        success: function (data, model) {

                            if (data['others'][0][0]['STATUS']) {
                                me.tools.alert.info("Success");

                            } else {
                                me.tools.alert.error("Something error when processing your request");
                            }
                            f.setLoading(false);
                        }
                    }).read('processhal');
                }


            }


        };
        return x;
    },
    toolProcessDay: function () {
        var me = this;

        var x = {
            process: function () {
                var p = me.getPanel();
                p.setLoading("Processing Day..");
                me.tools.ajax({
                    params: {
                        month: me.getSelectedMonth(),
                        year: me.getSelectedYear()
                    },
                    success: function (data, model) {

                        if (data['others'][0][0]['STATUS']) {
                            me.tools.alert.info("Success");

                        } else {
                            me.tools.alert.error("Something error when processing your request");
                        }
                        p.setLoading(false);
                    }
                }).read('processday');
            }
        };
        return x;
    },
    toolProcessLate: function () {
        var me = this;

        var x = {
            form: function () {

                me.instantWindow("FormToolProcessLate", 400, "Process Late", "processlate", "toolProcessLateWinId");

            },
            processOnClick: function () {
                var f = me.getFormlate();
                var vs = f.getValues();
                var opt = vs["option"];
                var ajaxParams = {};
                var isValid = false;
                switch (opt) {
                    case "employee":
                        var emId = me.getSelectedEmployee();
                        if (emId) {
                            isValid = true;
                            ajaxParams = {
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                process: 'employee',
                                employee_id: emId.get("employee_employee_id")
                            };
                        } else {
                            me.tools.alert.warning("Please select employee first");
                        }

                        break;
                    case "division":
                        var divId = me.getSelectedDepartment();
                        if (divId === 0 || divId === 999) {
                            me.tools.alert.warning("Please select department first");

                        } else {
                            isValid = true;
                            ajaxParams = {
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                process: 'department',
                                department_id: divId
                            };
                        }
                        break;
                    case "all":
                        isValid = true;
                        ajaxParams = {
                            month: me.getSelectedMonth(),
                            year: me.getSelectedYear(),
                            process: 'all'
                        };
                        break;
                }
                if (isValid) {
                    f.setLoading("Processing...");
                    me.tools.ajax({
                        params: ajaxParams,
                        success: function (data, model) {

                            if (data['others'][0][0]['STATUS']) {
                                me.tools.alert.info("Success");

                            } else {
                                me.tools.alert.warning(data['others'][0][0]['MSG']);
                                // me.tools.alert.error("Something error when processing your request");
                            }
                            f.setLoading(false);
                        }
                    }).read('processlate');
                }


            }


        };
        return x;
    },
    transferAjax: function (form, current, all) {
        var me = this;
        form.setLoading("Progress : " + current + " of " + all);
        me.tools.ajax({
            params: {data: Ext.encode(me.fpnl[current - 1])},
            autoAbort: true,
            success: function (data, model) {

                if (data['others'][0][0]['STATUS']) {

                    if (current < all) {
                        me.transferAjax(form, current + 1, all);
                    } else {
                        form.setLoading(false);
                        
                        // added by wulan sari 20200432
                        me.transferTeams();
                    }


                } else {
                    me.tools.alert.warning("Error");
                    form.setLoading(false);
                        
                    // added by wulan sari 20200432
                    me.transferTeams();

                }


            }

        }).read('transfersave');
        
       

    },
    transferTeams: function () {
       // added by wulan sari 20200432
        var me = this;
        var f = me.getFormtransfer();
        var fromDate = new Date(f.down("[name=start_day]").getValue());
        var endDate = new Date(f.down("[name=end_day]").getValue());
        me.tools.ajax({
            params: {
                start_date: fromDate,
                end_date: endDate
            },
            autoAbort: true,
            success: function (data, model) {
                f.setLoading(false);
                f.up("window").close();
            }

        }).read('transferteams');        
    },
    toolTransfer: function () {
        var me = this;
        // added by Michael 2021.05.19 
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19 

        var x = {
            form: function () {

                me.instantWindow("FormToolTransfer", 400, "Transfer", "transfer", "tooltransferWinId");
                var date = new Date();
                date.setFullYear(me.getSelectedYear());
                date.setMonth(me.getSelectedMonth() - 1);
                me.getFormtransfer().down("[name=start_day]").setValue(date);
                me.getFormtransfer().down("[name=end_day]").setValue(date);

            },
            processOnClick: function () {
                var f = me.getFormtransfer();
                var vs = f.getValues();
                f.setLoading("Request transfer...");


                var fromDate = new Date(f.down("[name=start_day]").getValue());
                var endDate = new Date(f.down("[name=end_day]").getValue());
                var startDay = fromDate.getDate();
                var endDay = endDate.getDate();
                
                me.tools.ajax({
                    params: {
                        month: me.tools.intval(fromDate.getMonth()) + 1,
                        year: fromDate.getFullYear(),
                        start_day: startDay,
                        end_day: endDay,
                        is_delete: vs['delete'],
                        // added by Michael 2021.05.19 
                        projectptid_opsi: projectptid_opsi
                        // end added by Michael 2021.05.19 
                    },
                    autoAbort: true,
                    success: function (data, model) {

                        if (data['others'][0][0]['STATUS']) {
                            // me.tools.alert.info("Success transfer");
                            me.fpnl = data['others'][0][0]['FPNUMBERLIST'];//FPNUMBERLIST


                            me.transferAjax(f, 1, me.fpnl.length);

                        } else {
                            me.tools.alert.warning(data['others'][0][0]['ERRORMSG']);

                            // added by wulan sari 20200432
                            me.transferTeams();

                        }

                        //  f.setLoading(false);
                        //f.up("window").close();
                    }

                }).read('transferinfo');
            }



        };
        return x;
    },
    toolDelete: function () {
        var me = this;

        var x = {
            form: function () {

                me.instantWindow("FormToolDelete", 400, "Delete Data", "delete", "tooldeleteWinId");

            },
            confirm: function (buttonForm) {
                var that = this;
                Ext.Msg.show({
                    title: 'Confirm',
                    msg: 'Do you want delete this data?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (clicked) {
                        that.confirmClicked(clicked, buttonForm.up("form"));
                        buttonForm.up("window").destroy();
                    }
                });
            },
            confirmClicked: function (clicked, form) {
                var vs = form.getValues();
                if (clicked === "yes") {

                    var eg = me.getGridemployee();
                    var g = me.getGrid();
                    var receg = eg.getSelectedRecord();
                    var rec = g.getSelectedRecord();


                    if (vs["option"] === "employee") {
                        if (receg) {
                            var p = me.getPanel();
                            p.setLoading("Please wait, deleting absent...");
                            me.tools.ajax({
                                params: {
                                    absent_id: receg.get("absent_id")
                                },
                                success: function (data, model) {

                                    if (data['others'][0][0]['STATUSDELETE']) {
                                        me.tools.alert.info("Absent successful deleted");
                                        me.emGrid().select();
                                    } else {
                                        me.tools.alert.error("Something error when processing your request");
                                    }
                                    p.setLoading(false);
                                }
                            }).read('deletemainabsent');
                        }
                    } else if (vs["option"] === "date") {
                        if (rec) { // selected absent ?
                            var p = me.getPanel();
                            p.setLoading("Please wait, deleting absent record...");
                            me.tools.ajax({
                                params: {
                                    absentdetail_id: rec.get("absentdetail_id")
                                },
                                success: function (data, model) {

                                    if (data['others'][0][0]['STATUSDELETE']) {
                                        me.tools.alert.info("Absent date successful deleted");
                                        me.emGrid().select();
                                    } else {
                                        me.tools.alert.error("Something error when processing your request");
                                    }
                                    p.setLoading(false);
                                }
                            }).read('deleteabsentdate');
                        }
                    }
                }
            }

        };
        return x;
    },
    continueOnClick: function (el) {
        var me = this;
        var f = me.getFormgen();
        var d = f.down("[name=date]").getValue();
        var valid = me.tools.inputMonthYear(d);

        // added by Michael 2021.05.19 
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19 

        if (valid.valid) {
            var validDate = valid.date;
            var g = me.getGridemployee();
            f.setLoading("Please wait...");
            var s = g.getStore();

            var res = d.split("/");
            var monthdata = res[0];
            var yeardata = res[1];
            
            /* comment by Wulan Sari 2018.05.07
             * di update karena ada bugs generate next periode tidak terbentuk kalau project pt sama sekali belum ada di th_absent
             * jadi diupdate di function added by Wulan Sari 2018.05.07
            s.load({
                params: {
                    mode_read: 'new',
                    //month_pick: validDate.getMonth() + 1,
                    //year_pick: validDate.getFullYear()
                    month_pick: monthdata,
                    year_pick: yeardata
                },
                callback: function () {
                    f.setLoading(false);

                    me.tools.alert.info("Updated", function () {
                        f.up("window").close();
                    });

                    me.panelAfterRender(me.getPanel());


                }
            });*/
            
            
            // added by Wulan Sari 2018.05.07
            Ext.Ajax.request({
                url: 'hrd/absentrecord/read',
                params: {
                    mode_read: 'new',
                    month_pick: monthdata,
                    year_pick: yeardata,
                    // added by Michael 2021.05.19 
                    projectptid_opsi : projectptid_opsi
                    // end added by Michael 2021.05.19 
                },
                success: function (response) {
                    f.setLoading(false);

                    me.tools.alert.info("Updated", function () {
                        f.up("window").close();
                    });

                    // me.panelAfterRender(me.getPanel());
                    
                    // added by Michael 2021.05.19 
                    me.projectptFilter();
                    // end added by Michael 2021.05.19 

                }

            });
            // end added by Wulan Sari 2018.05.07
            
            
        } else {
            me.tools.alert.warning(valid.msg);
        }

    },
    // added by Michael 2021.05.19 
    projectptFilter: function (el) {
        var me = this;
        // me.panelAfterRender(me.getPanel());
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        
        //default pindah ke department
        // var valopt = {pilihan_filter : 'department'};
        // fs.down("[name=pilihan_filter]").setValue(valopt);
        // console.log(me.currentFilter.projectpt +' == '+ projectptid_opsi);
        //year, month
        var kel = fs.down("[name=year_pick]");
        kel.bindPrefixName = 'absentrecord';
        kel.doInit(true, {
            projectptid_opsi : projectptid_opsi
        }, function () {

            me.yearPickOnChange();

        });

        me.tools.ajax({
            params: {
                projectptid_opsi : projectptid_opsi
            },
            success: function (data, model) {
                me.tools.wesea(data.kelompokabsensi, fs.down("[name=search_kelompokabsensi_id]")).comboBox();
                
                setTimeout(function () {
                    var vs = fs.getValues();    
                    pilihan_filter = vs["pilihan_filter"];

                    if(pilihan_filter == 'kelompok'){
                        fs.down("[name=search_department_id]").hide(); 
                        fs.down("[name=search_department_id]").setValue(); 
                        fs.down("[name=search_kelompokabsensi_id]").show();   
                        var el = fs.down("[name=search_kelompokabsensi_id]");
                        var ds = el.getStore();
                        ds.clearFilter(true);
                        if (ds.getCount() > 0) {
                            var highId = ds.getAt(0).get('kelompokabsensi_id');
                            el.setValue(highId);
                            el.fireEvent("select");
                            // console.log(highId);
                        }
                    // console.log(pilihan_filter);
                    }
                }, 1000);
            }
        }).read('listcb');


    },
    // end added by Michael 2021.05.19 
    monthPickOnChange: function (el) {
        var me = this;
        var f = me.getFormsearch();
        var vy = me.tools.intval(f.down("[name=year_pick]").getValue());
        var vm = me.tools.intval(f.down("[name=month_pick]").getValue());
        // added by Michael 2021.05.19 
        var projectptid_opsi = f.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19 

        me.getGrid().getStore().loadData([], false);

        if (vy > 0 && vm > 0) {
            var kel = f.down("[name=search_department_id]");
            kel.bindPrefixName = 'absentrecord';
            kel.doInit(true, {
                year: vy,
                month: vm,
                // added by Michael 2021.05.19 
                projectptid_opsi:projectptid_opsi
                // end added by Michael 2021.05.19 
            }, function () {


                /// set default department
                if (me.currentFilter.dep > 0 ) {
                    // kel.setValue(me.currentFilter.dep);

                    // added by Michael 2021.05.19 
                    if(me.currentFilter.projectpt == projectptid_opsi){
                        kel.setValue(me.currentFilter.dep);
                    }else{
                        var ds = kel.getStore();
                        ds.clearFilter(true);
                        if (ds.getCount() > 0) {
                            var highDepartment = ds.getAt(ds.getCount() - 1).get('department_id');
                                kel.setValue(highDepartment);
                                kel.fireEvent("select");
                        }
                        // console.log(me.currentFilter.projectpt +' == '+ projectptid_opsi);
                    }
                    // end added by Michael 2021.05.19 
                }

                me.filterEmployeeList();
                //me.monthPickOnChange();

            });
        } else {
            console.log("[ABSENTFILTER] tidak ada month atau year");
        }

    },
    filterEmployeeList: function () {
        var me = this;

        me.getGrid().getStore().loadData([], false);
        var g = me.getGridemployee();
        var f = me.getFormsearch();
        var vy = me.tools.intval(f.down("[name=year_pick]").getValue());
        var vm = me.tools.intval(f.down("[name=month_pick]").getValue());
        var vd = me.tools.intval(f.down("[name=search_department_id]").getValue());
        
        // added by wulan 25.04.2018
        var vk = me.tools.intval(f.down("[name=search_kelompokabsensi_id]").getValue());

        // added by Michael 2021.05.19 
        var projectptid_opsi = me.tools.intval(f.down("[name=search_projectpt_id]").getValue());
        // end added by Michael 2021.05.19 
        
        
        g.doInit();
        g.getStore().load({
            params: {
                year: vy, month: vm, department_id: vd, kelompokabsensi_id: vk,
                // added by Michael 2021.05.19 
                projectptid_opsi:projectptid_opsi
                // end added by Michael 2021.05.19 
            },
            callback: function (rec, op) {
                g.attachModel(op);


                // select first value
                if (g.getStore().getCount() > 0) {
                    if (me.currentFilter.emId > 0) {
                        var indexFound = g.getStore().findExact('employee_employee_id', me.currentFilter.emId);
                        if (indexFound >= 0) {
                            g.getSelectionModel().select(indexFound);
                        } else {
                            g.getSelectionModel().select(0);
                        }
                        // g.getSelectionModel().select(me.currentFilter.emIndex);
                    } else {
                        g.getSelectionModel().select(0);
                    }
                }




                // me.myFilters().employee(0, 0, 0);



            }
        });

        // var f = me.getFormsearch();
        //  me.myFilters().employee(f.down("[name=year_pick]").getValue(), f.down('[name=month_pick]').getValue(), f.down('[name=search_department_id]').getValue());



    },
    yearPickOnChange: function (el) {
        var me = this;
        var f = me.getFormsearch();

        me.getGrid().getStore().loadData([], false);

        var val = me.tools.intval(f.down("[name=year_pick]").getValue());
        if (val > 0) {
            // added by Michael 2021.05.19 
            var projectptid_opsi = f.down("[name=search_projectpt_id]").getValue();
            // end added by Michael 2021.05.19 
            var kel = f.down("[name=month_pick]");
            kel.bindPrefixName = 'absentrecord';
            kel.doInit(true, {
                year: val,
                // added by Michael 2021.05.19 
                projectptid_opsi: projectptid_opsi
                // end added by Michael 2021.05.19 
            }, function () {

                me.monthPickOnChange();

            });
        }


    },
    resetGrid: function () {
        var me = this;
        var grid = me.getFormsearch().down("absentrecordemployeegrid");
        if (grid) {
            me.getFormsearch().down('absentrecordemployeegrid').getStore().loadData([], false);

        }
        me.getGrid().getStore().loadData([], false);

    },
    filterDepartment: function (el, val) {
        var me = this;
        var fs = me.getFormsearch();
        var grid = fs.down("absentrecordemployeegrid");

        if (grid) {
            var s = fs.down("absentrecordemployeegrid").getStore();
            s.clearFilter(true);
            if (s.getCount() > 0 && val) {

                s.filterBy(function (rec, id) {

                    if (rec.raw.department.department_id === val) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
        }

    },
    showFormReason: function () {
        var me = this;
        me.instantWindow("FormDataReason", 600, "Reason", "create", "reasonwindow");
        /*
         var f = me.getFormreason();
         f.setLoading("Please wait...");
         me.tools.ajax({
         params: {},
         success: function(data, model) {
         //var status = data["others"][0][0]["STATUS"];
         me.atgcLeave = data["others"][0][0]["ATGC_LEAVE"];
         console.log(me.atgcLeave);
         f.setLoading(false);
         
         }
         }).read('parameter');
         */

    },
    showFormOnduty: function () {
        var me = this;
        me.instantWindow("FormDataOnduty", 400, "On Duty Outside", "create", "ondutywindow");
    },
    /* employee Grid */
    emGrid: function () {
        var me = this;
        var x = {
            fdar: function () {
                
                // edit by wulan sari 19 mei 2021
                // reset department_id saat pindah2 project PT
                var fs = me.getFormsearch();     
                var el = fs.down("[name=search_department_id]");
                var ds = el.getStore();
                ds.clearFilter(true);
                if (ds.getCount() > 0) {
                    var highDepartment = ds.getAt(ds.getCount() - 1).get('department_id');
                    el.setValue(highDepartment);
                    el.fireEvent("select");
                }
                
            },
            select: function () {
                var g = me.getGridemployee();
                var rec = g.getSelectedRecord();
                if (rec) {
                    var emId = rec.get("employee_employee_id");

                    // added by Michael 2021.05.19 
                    var fs = me.getFormsearch();
                    var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                    // end added by Michael 2021.05.19 

                    var gm = me.getGrid();
                    var s = gm.getStore();
                    s.getProxy().extraParams.month = me._getDate().getMonth();
                    s.getProxy().extraParams.year = me._getDate().getYear();
                    s.getProxy().extraParams.employee_id = emId;
                    // added by Michael 2021.05.19 
                    s.getProxy().extraParams.projectptid_opsi = projectptid_opsi;
                    // end added by Michael 2021.05.19
                    g.setLoading("Please wait...");
                    s.load({
                        callback: function () {
                            g.setLoading(false);
                        }
                    });
                }
            }
        };
        return x
    },
    shift: function () {
        var me = this;
        var x = {
            insertToSheet: function () {
                var g = me.getGrid();
                var f = me.getFormshift();
                var s = g.getStore();

                // added by Michael 2021.05.19 
                var fs = me.getFormsearch();
                var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                var selectedShift = f.down("[name=shifttype_id]").getValue();
                if(selectedShift){
                    me.tools.ajax({
                            params: {'getid':selectedShift},
                            success: function (data, model) {
                                var code = data.others[0].code;
                                if (selectedShift) {
                                    var pos = 0;
                                    var cbVal = false;
                                    var updatedDate = [];

                                    /// get selected day in form
                                    var vs = f.getValues();
                                    var currentDay = 0;
                                    var selectedDays = [];
                                    var dayDeli = "";
                                    for (var i = 1; i < 32; i++) {
                                        currentDay = vs['day_' + i];
                                        if (currentDay) {
                                            selectedDays.push(i);
                                            dayDeli += i + "~";
                                        }
                                    }


                                    if (selectedDays.length > 0) {
                                        var curIndex = -1;
                                        var curRec = null;

                                        //added by michael 04/11/2021 (krn saat setup shift per employee curIndexnya gak jalan)
                                        var currIndex_temp = -1;
                                        //end added by michael 04/11/2021

                                        for (var i = 0; i < selectedDays.length; i++) {
                                            curIndex = s.findExact('day', selectedDays[i]);
                                            
                                            //added by michael 04/11/2021 (krn saat setup shift per employee curIndexnya gak jalan)
                                            currIndex_temp = selectedDays[i]-1;
                                            curIndex = currIndex_temp;
                                            //end added by michael 04/11/2021
                                            
                                            if (curIndex > -1) {
                                                curRec = s.getAt(curIndex);
                                                if (curRec) {
                                                    updatedDate.push({
                                                        absentdetail_id: curRec.get("absentdetail_id"),
                                                        shifttype_shifttype_id: f.down("[name=shifttype_id]").getValue()
                                                    });
                                                    curRec.beginEdit();
                                                    curRec.set({
                                                        shifttype_code: code
                                                    });
                                                    curRec.endEdit();
                                                }

                                            }
                                        }


                                    } else {
                                        me.tools.alert.warning("No day selected");
                                    }





                                    var params = {
                                        mode_create: "setupsheet",
                                        data: {
                                            month: me._getDate().getMonth(),
                                            detail: updatedDate,
                                        }
                                    };

                                    /*
                                     console.log(vs);
                                     console.log(selectedDays);
                                     return;
                                     */


                                    if (vs["pilihan_target"] === "employee") {
                                        Ext.Ajax.request({
                                            url: 'hrd/absentrecord/create',
                                            success: function (response) {
                                                var info = Ext.JSON.decode(response.responseText);
                                                Ext.Msg.alert('Status', info.msg);
                                                if (info.msg === "SUCCESS") {
                                                    f.up("window").close();
                                                }

                                            },
                                            params: {data: Ext.encode(params)}

                                        });
                                                                                                                          
                                    } else if (vs["pilihan_target"] === "division" || vs["pilihan_target"] === "all" || vs["pilihan_target"] === "kelompok") { 
                                        
                                        f.setLoading(true);
                                        me.tools.ajax({
                                            params: {
                                                department_id: me.getSelectedDepartment(),
                                                kelompokabsensi_id: me.getSelectedKelompokabsensi(), // added by Wulan Sari 2018.04.25
                                                shifttype_id: vs["shifttype_id"],
                                                days: dayDeli,
                                                month: me.getSelectedMonth(),
                                                year: me.getSelectedYear(),
                                                update_type: vs["pilihan_target"],
                                                projectptid_opsi: projectptid_opsi
                                            },
                                            success: function (data, model) {
                                                var status = data["others"][0][0]["STATUS"];
                                                if (!status) {
                                                    me.tools.alert.warning(data["others"][0][0]["MSG"]);
                                                } else {
                                                    me.tools.alert.info("Success");
                                                    f.up("window").close();
                                                }
                                                f.setLoading(false);

                                            }
                                        }).read('setupshift');
                                        
                                    }



                                } else {
                                    me.tools.alert.warning("Mohon cek pilihan tipe shift");
                                }
                            }
                    }).read('detail_setupshift');

                } else {
                        me.tools.alert.warning("Mohon cek pilihan tipe shift");
                }

                // end added by Michael 2021.05.19 



                // var selectedShift = f.down("[name=shifttype_id]").getSelectedRec();
                // if (selectedShift) {
                //     var pos = 0;
                //     var cbVal = false;
                //     var updatedDate = [];

                //     /// get selected day in form
                //     var vs = f.getValues();
                //     var currentDay = 0;
                //     var selectedDays = [];
                //     var dayDeli = "";
                //     for (var i = 1; i < 32; i++) {
                //         currentDay = vs['day_' + i];
                //         if (currentDay) {
                //             selectedDays.push(i);
                //             dayDeli += i + "~";
                //         }
                //     }


                //     if (selectedDays.length > 0) {
                //         var curIndex = -1;
                //         var curRec = null;
                //         for (var i = 0; i < selectedDays.length; i++) {
                //             curIndex = s.findExact('day', selectedDays[i]);
                //             if (curIndex > -1) {
                //                 curRec = s.getAt(curIndex);
                //                 if (curRec) {
                //                     updatedDate.push({
                //                         absentdetail_id: curRec.get("absentdetail_id"),
                //                         shifttype_shifttype_id: f.down("[name=shifttype_id]").getValue()
                //                     });
                //                     curRec.beginEdit();
                //                     curRec.set({
                //                         shifttype_code: selectedShift.get("code")
                //                     });
                //                     curRec.endEdit();
                //                 }

                //             }
                //         }


                //     } else {
                //         me.tools.alert.warning("No day selected");
                //     }





                //     var params = {
                //         mode_create: "setupsheet",
                //         data: {
                //             month: me._getDate().getMonth(),
                //             detail: updatedDate,
                //         }
                //     };

                //     /*
                //      console.log(vs);
                //      console.log(selectedDays);
                //      return;
                //      */


                //     if (vs["pilihan_target"] === "employee") {
                //         Ext.Ajax.request({
                //             url: 'hrd/absentrecord/create',
                //             success: function (response) {
                //                 var info = Ext.JSON.decode(response.responseText);
                //                 Ext.Msg.alert('Status', info.msg);
                //                 if (info.msg === "SUCCESS") {
                //                     f.up("window").close();
                //                 }

                //             },
                //             params: {data: Ext.encode(params)}

                //         });
                                                                                                          
                //     } else if (vs["pilihan_target"] === "division" || vs["pilihan_target"] === "all" || vs["pilihan_target"] === "kelompok") { 
                        
                //         f.setLoading(true);
                //         me.tools.ajax({
                //             params: {
                //                 department_id: me.getSelectedDepartment(),
                //                 kelompokabsensi_id: me.getSelectedKelompokabsensi(), // added by Wulan Sari 2018.04.25
                //                 shifttype_id: vs["shifttype_id"],
                //                 days: dayDeli,
                //                 month: me.getSelectedMonth(),
                //                 year: me.getSelectedYear(),
                //                 update_type: vs["pilihan_target"]
                //             },
                //             success: function (data, model) {
                //                 var status = data["others"][0][0]["STATUS"];
                //                 if (!status) {
                //                     me.tools.alert.warning(data["others"][0][0]["MSG"]);
                //                 } else {
                //                     me.tools.alert.info("Success");
                //                     f.up("window").close();
                //                 }
                //                 f.setLoading(false);

                //             }
                //         }).read('setupshift');
                        
                //     }



                // } else {
                //     me.tools.alert.warning("Mohon cek pilihan tipe shift");
                // }

            },
            fdar: function (el) {

                var cb = ["shifttype_id"];
                var f = me.getFormshift();
                var fs = me.getFormsearch();
                var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                for (var c in cb) {
                    var cmp = f.down("[name=" + cb[c] + "]");
                    if (cmp) {
                        f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
                        // f.down("[name=" + cb[c] + "]").doInit(true, function () {
                        //     f.setLoading(false);
                        // });
                        // added by Michael 2021.05.19 
                        setTimeout(function () {
                            me.tools.ajax({
                                params: {'projectptid_opsi':projectptid_opsi},
                                success: function (data, model) {
                                    me.tools.wesea(data.shifttype, f.down("[name=shifttype_id]")).comboBox();
                                    console.log(data.shifttype);

                                }
                            }).read('mastersetupshift_projectpt');
                        },500);
                        // end added by Michael 2021.05.19 
                    }

                }
                /// check for selected day
                var g = me.getGrid();
                var recs = g.getSelectionModel().selected.items;
                if (recs.length > 0) {
                    for (var i in recs) {
                        f.down("[name=day_" + recs[i].get("day") + "]").setValue(1);
                    }

                }

                // added by Michael 2021.05.19 
                // var f = me.getFormshift();
                // var fs = me.getFormsearch();
                // var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();

                // setTimeout(function () {
                //     me.tools.ajax({
                //         params: {'projectptid_opsi':projectptid_opsi},
                //         success: function (data, model) {
                //             me.tools.wesea(data.shifttype, f.down("[name=shifttype_id]")).comboBox();
                //             console.log(data.shifttype);

                //             var cb = ["shifttype_id"];
                //             for (var c in cb) {
                //                 var cmp = f.down("[name=" + cb[c] + "]");
                //                 if (cmp) {
                //                     f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
                //                     console.log(me.controllerName);
                //                     f.down("[name=" + cb[c] + "]").doInit(true, function () {
                //                         f.setLoading(false);
                //                     });
                //                 }

                //             }
                //             /// check for selected day
                //             var g = me.getGrid();
                //             var recs = g.getSelectionModel().selected.items;
                //             if (recs.length > 0) {
                //                 for (var i in recs) {
                //                     f.down("[name=day_" + recs[i].get("day") + "]").setValue(1);
                //                 }

                //             }
                //         }
                //     }).read('mastersetupshift_projectpt');
                // },500);

                // end added by Michael 2021.05.19 


            },
            winShow: function () {
                /// check sheet
                var c = me.getGrid().getStore().getCount();

                if (c > 0) {
                    me.instantWindow("FormSetupShift", 700, "Setup Shift", "create", "setupshiftwindow");
                } else {
                    Ext.Msg.alert('Alert', 'Please generate next periode first');
                }

            },
            comboOnChange: function (el) {
                var f = me.getFormshift();
                // f.loadRecord(el.getSelectedRec());
                // added by Michael 2021.05.19 
                var getid = f.down("[name=shifttype_id]").getValue();
                me.tools.ajax({
                        params: {'getid':getid},
                        success: function (data, model) {
                            f.down("[name=in_time]").setValue(data.others[0].in_time);
                            f.down("[name=out_time]").setValue(data.others[0].out_time);
                        }
                }).read('detail_setupshift');
                // end added by Michael 2021.05.19 

            },
            genHoliday: function (el) {
                var f = me.getFormshift();
                me.instantWindow("FormEmployeeOption", 400, "Generate From Holiday", "generate", "GenerateHolWinID");

            },
            genHolidayProcess: function (el) {
                var f = me.getFormgenholiday();
                var vs = f.getValues();
                console.log(vs);

                // added by Michael 2021.05.19 
                var fs = me.getFormsearch();
                var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                // end added by Michael 2021.05.19 

                switch (vs["option"]) {
                    case "employee":
                        var emp = me.getGridemployee().getSelectedRecord();
                        if (emp) {
                            f.setLoading("Generate shift from holiday...");
                            me.tools.ajax({
                                params: {
                                    month: me.getSelectedMonth(),
                                    year: me.getSelectedYear(),
                                    process_type: "employee",
                                    employee_id: emp.get("employee_employee_id"),
                                    // added by Michael 2021.05.19 
                                    projectptid_opsi: projectptid_opsi
                                    // end added by Michael 2021.05.19 
                                },
                                success: function (data, model) {
                                    var status = data["others"][0][0]["STATUS"];
                                    if (!status) {
                                        me.tools.alert.warning(data["others"][0][0]["MSG"]);
                                    } else {
                                        me.tools.alert.info("Success");
                                    }
                                    f.setLoading(false);

                                }
                            }).read('genholiday');
                        } else {
                            me.tools.alert.warning("Please select employee first");
                        }
                        break;
                    case "division":
                        var d = me.getSelectedDepartment();
                        if (d == 999) {
                            me.tools.alert.warning("Please select department first");
                        } else {
                            f.setLoading("Generating from holiday...");
                            me.tools.ajax({
                                params: {
                                    process_type: "department",
                                    month: me.getSelectedMonth(),
                                    year: me.getSelectedYear(),
                                    department_id: me.getSelectedDepartment(),
                                    // added by Michael 2021.05.19 
                                    projectptid_opsi: projectptid_opsi
                                    // end added by Michael 2021.05.19 
                                },
                                success: function (data, model) {
                                    var status = data["others"][0][0]["STATUS"];
                                    if (!status) {
                                        me.tools.alert.warning(data["others"][0][0]["MSG"]);
                                    } else {
                                        me.tools.alert.info("Success");
                                    }
                                    f.setLoading(false);

                                }
                            }).read('genholiday');
                        }

                        break;
                    case "all":
                        f.setLoading("Generating from holiday...");
                        me.tools.ajax({
                            params: {
                                process_type: "all",
                                month: me.getSelectedMonth(),
                                year: me.getSelectedYear(),
                                // added by Michael 2021.05.19 
                                projectptid_opsi: projectptid_opsi
                                // end added by Michael 2021.05.19 
                            },
                            success: function (data, model) {
                                var status = data["others"][0][0]["STATUS"];
                                if (!status) {
                                    me.tools.alert.warning(data["others"][0][0]["MSG"]);
                                } else {
                                    me.tools.alert.info("Success");
                                }
                                f.setLoading(false);

                            }
                        }).read('genholiday');
                        break;
                }

            }
        };
        return x;
    },
    _getDate: function () {
        var me = this;
        var fs = me.getFormsearch();

        var x = {
            getMonth: function () {
                var m = parseInt(fs.down("[name=month_pick]").getValue());
                m = isNaN(m) ? 0 : m;
                return m;
            },
            getYear: function () {
                var y = parseInt(fs.down("[name=year_pick]").getValue());
                y = isNaN(y) ? 0 : y;
                return y;
            }
        };
        return x;
    },
    generateSheet: function () {
        var me = this;
        me.instantWindow("FormGenerateSheet", 400, "Generate New Period", "create", "generatesheetwindow");
        var monthPickStore = me.getFormsearch().down("[name=month_pick]").getStore();

        // added by Michael 2021.05.19 
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19 

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19 
            },
            success: function (data, model) {
                var f = me.getFormgen();

                f.down("[name=date]").setValue(data["others"][0][0]["DATA"]);
                //  p.setLoading(false);

            }
        }).read('periodeterakhir');



    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        el.up("window").maximize();

        me.getGrid().getStore().loadData([], false);

        var kel = f.down("[name=year_pick]");
        kel.bindPrefixName = 'absentrecord';
        kel.doInit(true, {}, function () {

            // me.yearPickOnChange();

        });
        
        // added by wulan 25.04.2018
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.kelompokabsensi, f.down("[name=search_kelompokabsensi_id]")).comboBox();
            }
        }).read('listcb');

        // added by Michael 2021.05.19 
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.projectpt, f.down("[name=search_projectpt_id]")).comboBox();

                var projectptid_curr = data.others[0].projectptid_curr;
                f.down("[name=search_projectpt_id]").setValue(projectptid_curr);
            }
        }).read('listprojectpt');
        // end added by Michael 2021.05.19 
        

    },
    myFilters: function () {
        var me = this;
        var x = {
            month: function (year) {
                var el = me.getFormsearch().down("[name=month_pick]");
                var ms = el.getStore();
                ms.clearFilter(true);
                ms.filter([
                    {filterFn: function (item) {
                            return item.get("year") == year;
                        }}
                ]);
                if (ms.getCount() > 0) {
                    var highMonth = ms.getAt(ms.getCount() - 1).get('number');
                    el.setValue(highMonth);
                    return highMonth;
                }
                return 0;

            },
            department: function (year, month) {
                var el = me.getFormsearch().down("[name=search_department_id]");
                var ds = el.getStore();


                ds.clearFilter(true);

                ds.filter([
                    {filterFn: function (item) {
                            return item.get("year") == year && item.get("month") == month;
                        }}
                ]);
                if (ds.getCount() > 0) {
                    var highDepartment = ds.getAt(ds.getCount() - 1).get('department_id');
                    el.setValue(highDepartment);
                    return highDepartment;
                }

                return 0;

            },
            employee: function (year, month, department) {
                var g = me.getGridemployee();
                var es = g.getStore();
                es.clearFilter(true);
                es.filter([
                    {filterFn: function (item) {
                            return item.get("year") == year && item.get("month") == month && item.get("department_department_id") == department;
                        }}
                ]);
                var f = me.getFormsearch();
                var s = f.down('absentrecordemployeegrid').getStore();
                if (s.getCount() > 0) {
                    f.down('absentrecordemployeegrid').getSelectionModel().select(0);
                }
            }
        };
        return x;
    },
    viewOneEmployeAbsent: function () {
        var me = this;
        var g = me.getGridemployee();
        var f = me.getFormsearch();
        // jika filter department datanya telah keload..
        if (me.filterLoaded.department && me.filterLoaded.employeeList) {
            g.getStore().clearFilter();

            // pilih salah satu department dari karyawan
            if (g.getStore().getCount() > 0) {
                var selectedEmp = g.getStore().getAt(0);
                var idDept = selectedEmp.get("department_department_id");
                f.down("[name=search_department_id]").setValue(idDept);
            }
        }
    },
    refreshFormFilter: function () {
        var me = this;
        var f = me.getFormsearch();
        var g = me.getGridemployee();
        g.doInit();
        g.getStore().load({
            callback: function (rec, op) {
                g.attachModel(op);

            }
        });
    },
    mainDataSave: function () {
        var me = this;

        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;
        var selectedShift = f.down("[name=shifttype_shifttype_id]").getSelectedRec();
        if (row < 0) {
            return;
        }
        if (!selectedShift) {
            Ext.Msg.alert('Alert', 'Please select shift type first.');
            return;
        }

        var rec = s.getAt(row);

        rec.beginEdit();
        rec.set({
            in_7_14: me._convertTime().formToGrid("timein"), // temporary store time in in timeA
            out_7_14: me._convertTime().formToGrid("timeout"), /// temporary store time out in timeA
            shifttype_code: selectedShift.get("code"),
            shifttype_shifttype_id: selectedShift.get("shifttype_id")
        });
        rec.endEdit();


        me.insSave({
            form: me.getFormdata(),
            grid: me.getGrid(),
            // store: me.localStore["detail"].store,
            finalData: function (data) {

                data["unit_unit_id"] = data["unit_id"];

                return data;
            },
            sync: true,
            callback: {
                create: function (store, form, grid) {

                }
            }
        });





    },
    fdar: function () {



        var me = this;
        var f = me.getFormdata();

        var g = me.getGrid();
        me.setActiveForm(f);

        var cb = ["shifttype_shifttype_id"];
        var f = me.getFormdata();
        for (var c in cb) {
            var cmp = f.down("[name=" + cb[c] + "]");
            if (cmp) {
                f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
                f.down("[name=" + cb[c] + "]").doInit(true, function () {
                    f.setLoading(false);
                });
            }

        }



        var x = {
            init: function () {




            },
            create: function () {

                me.unMask(1);
            },
            update: function () {
                f.editedRow = g.getSelectedRow();
                var rec = g.getSelectedRecord();

                if (rec) {
                    f.loadRecord(rec);
                    me.getTimeAByShiftType(rec);
                    me._convertTime().gridToForm("timein", rec.get("in_7_14"));
                    me._convertTime().gridToForm("timeout", rec.get("out_7_14"));
                }

                //shifttype_shifttype_id

                me.unMask(1);

            }
        };
        return x;
    },
    insACC: function (view, action, row) {
        var me = this;
        var grid = view.up("grid");
        switch (grid.itemId) {
            case "AbsentrecordGridStore":
                if (action == "destroy") {
                    // me.deleteUnitFromGrid(row);
                } else if (action == "update") {
                    // me.editUnitFromGrid(row);
                }
                break;
        }
    },
    _convertTime: function () {
        var me = this;
        var f = me.getFormdata();
        var x = {
            formToGrid: function (prefixField) {
                var hourObj = new Hrd.library.box.tools.Hour(f.down("[name=" + prefixField + "]").getValue());



                var time = new Date();

                time.setHours(hourObj.getHour());
                time.setMinutes(hourObj.getMinute());
                return time;
            },
            gridToForm: function (prefixField, date) {

                date = new Date(date);
                var h = me.util.number(date.getHours()).addZero(2) + ":" + me.util.number(date.getMinutes()).addZero(2) + ":00";
                f.down("[name=" + prefixField + "]").setValue(h);

            }
        };
        return x;
    },
    getDefaultDate: function () {
        var me = this;
        var selectedDay = me.getGrid().getSelectedRecord();
        selectedDay = selectedDay.get("day");
        var sd = new Date(); // start date
        var ed = new Date(); // end date
        sd.setDate(selectedDay);
        ed.setDate(selectedDay);
        sd.setFullYear(me._getDate().getYear());
        ed.setFullYear(me._getDate().getYear());

        sd.setMonth(me._getDate().getMonth() - 1);
        ed.setMonth(me._getDate().getMonth() - 1);
        return {
            sd: sd,
            ed: ed
        };
    },
    getTimeAByShiftType: function (rec) {
        console.log(rec);
    },
    /* selected filter di form search*/
    getSelectedEmployee: function () {
        return this.getGridemployee().getSelectedRecord();
    },
    getSelectedDepartment: function () {

        return this.getFormsearch().down("[name=search_department_id]").getValue();
    },
    
    
    // added by WUlan Sari 2018.04.25
    getSelectedKelompokabsensi: function () {

        return this.getFormsearch().down("[name=search_kelompokabsensi_id]").getValue();
    },
    
    
    getSelectedMonth: function () {
        return this.getFormsearch().down("[name=month_pick]").getValue();
    },
    getSelectedYear: function () {
        return this.getFormsearch().down("[name=year_pick]").getValue();
    },
    // added by Michael 2021.05.19 
    getSelectedProjectPt: function () {
        return this.getFormsearch().down("[name=search_projectpt_id]").getValue();
    },
    // end added by Michael 2021.05.19 
    /*@storeFilter
     * menyimpan state filter search sementara
     * */
    storeFilter: function () {
        var me = this;
        me.currentFilter.month = me.getSelectedMonth();
        me.currentFilter.dep = me.getSelectedDepartment();
        me.currentFilter.year = me.getSelectedYear();
        // me.currentFilter.emIndex = me.getGridemployee().getStore().indexOf(me.getGridemployee().getSelectedRecord());
        var rec = me.getGridemployee().getSelectedRecord();
        if (rec) {
            me.currentFilter.emId = rec.get("employee_employee_id");
        }
        // added by Michael 2021.05.19 
        me.currentFilter.projectpt = me.getSelectedProjectPt();
        // end added by Michael 2021.05.19 

//  me.currentFilter.emRec = me.getGridemployee().getSelectedRecord();
        console.log(me.currentFilter);

    },
    /* start added by ahmad riadi 06-04-2017 */
    showFormOptionintranet: function () {
        var me, record;
        me = this;
        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                if (data.others[1] == undefined) {
                    Ext.Msg.show({
                        title: 'WARNING',
                        msg: "Data master project tidak ada",
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING
                    });
                } else {
                    record = data.others[1];
                    if (record.dbintranet_name == undefined && record.dbintranet_name !== null) {
                        Ext.Msg.show({
                            title: 'WARNING',
                            msg: "Field config di master project belum ada...!",
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.WARNING
                        });
                    } else {
                        if (record.dbintranet_name == null || record.dbintranet_name == '') {
                            Ext.Msg.show({
                                title: 'WARNING',
                                msg: "Config di master project belum diisi...!",
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.WARNING
                            });
                        } else {
                            me.configintranet = record.dbintranet_name;
                            me.instantWindow("Formtransferbyintranet", 450, "Form Options Transfer Data", "options", "absentrecordformtransferbyintranet");
                        }

                    }

                }
            }
        }).read('checkconfigintranet');
    },
    routeGrid: function () {
        var me, form, formvalue, options;
        me = this;
        form = me.getFormtransferintranet();
        formvalue = form.getForm().getValues();
        options = formvalue.options;
        if (options == 'cuti') {
            me.instantWindow("Formoptionscuti", 920, "Browse Cuti", "options", "absentrecordformoptionscuti");
        } else if (options == 'ijin') {
            me.instantWindow("Formoptionsijin", 920, "Browse Ijin / Sakit", "options", "absentrecordformoptionsijin");
        } else if (options == 'dinasluarkantor') {
            me.instantWindow("Formoptionsdinas", 920, "Browse Tugas Luar Kantor", "options", "absentrecordformoptionsdinas");
        } else if (options == 'tukeroff') {
            me.instantWindow("Formoptionstukeroff", 920, "Browse Tuker Off", "options", "absentrecordformoptionstukeroff");
        } else if (options == 'pdlk') {
            me.instantWindow("Formoptionspdlk", 920, "Browse PDLK", "options", "absentrecordformoptionspdlk");
        } else if (options == 'overtime') {
            me.instantWindow("Formoptionsovertime", 920, "Browse Overtime", "options", "absentrecordformoptionsovertime");
        }
        // added by Michael 2021.06.15 
          else if (options == 'sakit') {
            me.instantWindow("Formoptionssakit", 920, "Browse Sakit", "options", "absentrecordformoptionssakit");
        }
        // end added by Michael 2021.06.15
        
        // added by Wulan 20210707
          else if (options == 'tukarshift') {
            me.instantWindow("Formoptionstukarshift", 920, "Browse Tukar Shift / Off", "options", "absentrecordformoptionstukarshift");
        }
        // end added by Wulan 20210707
    },
    getDatacutiintranet: function () {
        var me = this;
        me.getFilterdatacuti();
        
        /*
        var me, form, formvalue, grid, store;
        me = this;
        form = me.getFormoptioncuti();
        formvalue = form.getForm().getValues();
        grid = me.getGridcutiintranet();
        grid.doInit();
                
        // edited by wulan sari 20181216
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdatacutiintranet',
            configintranet: me.configintranet
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'approval_date', direction: 'DESC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
        */
    },
    getFilterdatacuti: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptioncuti();
        formvalue = form.getForm().getValues();

        if (formvalue.department_id == undefined || formvalue.department_id == '') {
            formvalue['deptcode'] = '';
        } else {
            rawdept = form.down("[name=department_id]").valueModels[0].raw;
            formvalue['deptcode'] = rawdept.code;
        }

        if (formvalue.employee_id == undefined || formvalue.employee_id == '') {
            formvalue['employee_name'] = '';
        } else {
            rawemployee = form.down("[name=employee_id]").valueModels[0].raw;
            formvalue['employee_name'] = rawemployee.employee_name;
        }
        
        if (formvalue.absenttype_id == undefined || formvalue.absenttype_id == '') {
            formvalue['cuti'] = '';
        } else {
            rawcuti = form.down("[name=absenttype_id]").valueModels[0].raw;
            formvalue['cuti'] = rawcuti.absenttype;
        }
        if (formvalue.hrd_checked == undefined) {
            formvalue['hrd_checked'] = 'NO';
        } else {
            formvalue['hrd_checked'] = formvalue.hrd_checked;
        }
        
        grid = me.getGridcutiintranet();
        grid.doInit();
        /*
        store = grid.getStore().load({
            params: {
                mode_read: 'filtercutiintranet',
                configintranet: me.configintranet,
                paramdata: Ext.JSON.encode(formvalue),
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'approval_date', direction: 'DESC'});
            }
        });
        */

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        // edited by wulan sari 20181216
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'filtercutiintranet',
            configintranet: me.configintranet,
            paramdata: Ext.JSON.encode(formvalue),
            // added by Michael 2021.05.19
            projectptid_opsi : projectptid_opsi
            // end added by Michael 2021.05.19
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'approval_date', direction: 'DESC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    getDataijinintranet: function (flag) {
        this.getFilterdataijin();
        
        /*
        var me, form, formvalue, grid, store;
        me = this;
        form = me.getFormoptionijin();
        formvalue = form.getForm().getValues();
        grid = me.getGridijinintranet();
        grid.doInit();
        
        // edited by wulan sari 20181216
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdataijinintranet',
            configintranet: me.configintranet,
            periode: formvalue.periode_bulan,
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'izin_date', direction: 'DESC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
        */
    },
    getFilterdataijin: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptionijin();
        formvalue = form.getForm().getValues();

        if (formvalue.department_id == undefined || formvalue.department_id == '') {
            formvalue['deptcode'] = '';
        } else {
            rawdept = form.down("[name=department_id]").valueModels[0].raw;
            formvalue['deptcode'] = rawdept.code;
        }
        
        if (formvalue.employee_id == undefined || formvalue.employee_id == '') {
            formvalue['employee_name'] = '';
        } else {
            rawemployee = form.down("[name=employee_id]").valueModels[0].raw;
            formvalue['employee_name'] = rawemployee.employee_name;
        }

        if (formvalue.absenttype_id == undefined || formvalue.absenttype_id == '') {
            formvalue['ijin'] = '';
        } else {
            rawcuti = form.down("[name=absenttype_id]").valueModels[0].raw;
            formvalue['ijin'] = rawcuti.absenttype;
        }
        if (formvalue.hrd_checked == undefined) {
            formvalue['hrd_checked'] = 'NO';
        } else {
            formvalue['hrd_checked'] = formvalue.hrd_checked;
        }

        grid = me.getGridijinintranet();
        grid.doInit();
        /*
        store = grid.getStore().load({
            params: {
                mode_read: 'filterijinintranet',
                configintranet: me.configintranet,
                paramdata: Ext.JSON.encode(formvalue),
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'izin_date', direction: 'DESC'});
            }
        });*/

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        // edited by wulan sari 20181216
        var store = grid.getStore();
        store.getProxy().extraParams = {
                mode_read: 'filterijinintranet',
                configintranet: me.configintranet,
                paramdata: Ext.JSON.encode(formvalue),
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'izin_date', direction: 'DESC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    
    // added by Wulan 20210707    
    getDatatukarshiftintranet: function (flag) {
        this.getFilterdatatukarshift();
    },
    getFilterdatatukarshift: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptiontukarshift();
        formvalue = form.getForm().getValues();

        if (formvalue.department_id == undefined || formvalue.department_id == '') {
            formvalue['deptcode'] = '';
        } else {
            rawdept = form.down("[name=department_id]").valueModels[0].raw;
            formvalue['deptcode'] = rawdept.code;
        }
        
        if (formvalue.employee_id == undefined || formvalue.employee_id == '') {
            formvalue['employee_name'] = '';
        } else {
            rawemployee = form.down("[name=employee_id]").valueModels[0].raw;
            formvalue['employee_name'] = rawemployee.employee_name;
        }

        if (formvalue.absenttype_id == undefined || formvalue.absenttype_id == '') {
            formvalue['tukarshift'] = '';
        } else {
            rawcuti = form.down("[name=absenttype_id]").valueModels[0].raw;
            formvalue['tukarshift'] = rawcuti.absenttype;
        }
        if (formvalue.hrd_checked == undefined) {
            formvalue['hrd_checked'] = 'NO';
        } else {
            formvalue['hrd_checked'] = formvalue.hrd_checked;
        }

        grid = me.getGridtukarshiftintranet();
        grid.doInit();

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        // edited by wulan sari 20181216
        var store = grid.getStore();
        store.getProxy().extraParams = {
                mode_read: 'filtertukarshiftintranet',
                configintranet: me.configintranet,
                paramdata: Ext.JSON.encode(formvalue),
                projectptid_opsi : projectptid_opsi
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'date', direction: 'DESC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    // end added by Wulan 20210707    
    
    getFilterdatadinas: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptiondinas();
        formvalue = form.getForm().getValues();

        if (formvalue.department_id == undefined || formvalue.department_id == '') {
            formvalue['deptcode'] = '';
        } else {
            rawdept = form.down("[name=department_id]").valueModels[0].raw;
            formvalue['deptcode'] = rawdept.code;
        }

        if (formvalue.employee_id == undefined || formvalue.employee_id == '') {
            formvalue['employee_name'] = '';
        } else {
            rawemployee = form.down("[name=employee_id]").valueModels[0].raw;
            formvalue['employee_name'] = rawemployee.employee_name;
        }

        if (formvalue.hrd_checked == undefined) {
            formvalue['hrd_checked'] = 'NO';
        } else {
            formvalue['hrd_checked'] = formvalue.hrd_checked;
        }

        grid = me.getGriddinasintranet();
        grid.doInit();
        /*
        store = grid.getStore().load({
            params: {
                mode_read: 'filterdinasintranet',
                configintranet: me.configintranet,
                paramdata: Ext.JSON.encode(formvalue),
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'start_date', direction: 'ASC'});

            }
        });
        */

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19
       
        // edited by wulan sari 20181216
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'filterdinasintranet',
            configintranet: me.configintranet,
            paramdata: Ext.JSON.encode(formvalue),
            // added by Michael 2021.05.19
            projectptid_opsi : projectptid_opsi
            // end added by Michael 2021.05.19
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'start_date', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    getDatadinasintranet: function (flag) {
        this.getFilterdatadinas();
        /*
        var me, form, formvalue, grid, store;
        me = this;
        form = me.getFormoptiondinas();
        formvalue = form.getForm().getValues();
        grid = me.getGriddinasintranet();
        grid.doInit();
        
        // edited by wulan sari 20181216
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdatadinasintranet',
            configintranet: me.configintranet,
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'start_date', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
        */
    },
    // added by Michael 2021.06.15 
    getFilterdatasakit: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptionsakit();
        formvalue = form.getForm().getValues();

        if (formvalue.department_id == undefined || formvalue.department_id == '') {
            formvalue['deptcode'] = '';
        } else {
            rawdept = form.down("[name=department_id]").valueModels[0].raw;
            formvalue['deptcode'] = rawdept.code;
        }

        if (formvalue.employee_id == undefined || formvalue.employee_id == '') {
            formvalue['employee_name'] = '';
        } else {
            rawemployee = form.down("[name=employee_id]").valueModels[0].raw;
            formvalue['employee_name'] = rawemployee.employee_name;
        }

        if (formvalue.hrd_checked == undefined) {
            formvalue['hrd_checked'] = 'NO';
        } else {
            formvalue['hrd_checked'] = formvalue.hrd_checked;
        }

        grid = me.getGridsakitintranet();
        grid.doInit();
        /*
        store = grid.getStore().load({
            params: {
                mode_read: 'filtersakitintranet',
                configintranet: me.configintranet,
                paramdata: Ext.JSON.encode(formvalue),
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'start_date', direction: 'ASC'});

            }
        });
        */

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19
       
        // edited by wulan sari 20181216
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'filtersakitintranet',
            configintranet: me.configintranet,
            paramdata: Ext.JSON.encode(formvalue),
            // added by Michael 2021.05.19
            projectptid_opsi : projectptid_opsi
            // end added by Michael 2021.05.19
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'start_date', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    getDatasakitintranet: function (flag) {
        this.getFilterdatasakit();
        /*
        var me, form, formvalue, grid, store;
        me = this;
        form = me.getFormoptionsakit();
        formvalue = form.getForm().getValues();
        grid = me.getGridsakitintranet();
        grid.doInit();
        
        // edited by wulan sari 20181216
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdatasakitintranet',
            configintranet: me.configintranet,
        };
        
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'start_date', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
        */
    },
    // blur: function (that, The, eOpts) {
            //     var me, form, hrd_comment, counter_hrd_comment;
            //     me = this;
            //     form = me.getFormdataintranetsakit();
            //     hrd_comment = form.down("[name=hrd_comment]").getValue();
            //     counter_hrd_comment = hrd_comment.length;

            //     if (me.hrd_check_sakit !== 'YES') {
            //         if (counter_hrd_comment > 0) {
            //             form.down("[name=sendmail]").setValue(true);
            //         } else {
            //             form.down("[name=sendmail]").setValue(false);
            //         }
            //     }

            // },
    viewFile:function(){
        var me = this;
        var f = me.getFormdataintranetsakit();
        var fileName = f.down("[name=attachment]").getValue();
        if(fileName.length > 0){
            window.open(document.URL+"app/hrd/uploads/sakit/"+fileName);
              
        }else{
            me.tools.alert.warning("Tidak ada file");
        }
    },
    //added by michael 16/11/2021
    viewFileCuti:function(){
        var me = this;
        var f = me.getFormdataintranetcuti();
        var fileName = f.down("[name=attachment]").getValue();
        if(fileName.length > 0){
            window.open(document.URL+"app/hrd/uploads/cuti_insidentil/"+fileName);
              
        }else{
            me.tools.alert.warning("Tidak ada file");
        }
    },
    viewFileReasonCuti:function(){
        var me = this;
        var f = me.getFormreason();
        var fileName = f.down("[name=attachment]").getValue();
        if(fileName.length > 0){
            window.open(document.URL+"app/hrd/uploads/cuti_insidentil/"+fileName);
              
        }else{
            me.tools.alert.warning("Tidak ada file");
        }
    },
    //end added by michael 16/11/2021
    viewFileReason:function(){
        var me = this;
        var f = me.getFormreason();
        var fileName = f.down("[name=attachment]").getValue();
        if(fileName.length > 0){
            window.open(document.URL+"app/hrd/uploads/sakit/"+fileName);
              
        }else{
            me.tools.alert.warning("Tidak ada file");
        }
    },
    // end added by Michael 2021.06.15 

    gridIntranetCutiActionColumnClick: function (view, cell, row, col, e) {
        var me, grid, record, row, action;
        me = this;
        grid = me.getGridcutiintranet();
        record = grid.getStore().getAt(row);
        action = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);

        if (action) {
            switch (action[1]) {
                case 'update':
                    me.rowintranetcuti = record;
                    me.instantWindow("FormDataIntranetCuti", 900, "FORM DATA CUTI", "options", "absentrecordformdataintranetcuti");
                    break;
            }
        }
    },
    gridIntranetIjinActionColumnClick: function (view, cell, row, col, e) {
        var me, grid, record, row, action;
        me = this;
        grid = me.getGridijinintranet();
        record = grid.getStore().getAt(row);
        action = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        if (action) {
            switch (action[1]) {
                case 'update':
                    me.rowintranetijin = record;
                    me.instantWindow("FormDataIntranetIjin", 900, "FORM DATA IJIN", "options", "absentrecordformdataintranetijin");
                    break;
            }
        }
    },
    gridIntranetDinasActionColumnClick: function (view, cell, row, col, e) {
        var me, grid, record, row, action;
        me = this;
        grid = me.getGriddinasintranet();
        record = grid.getStore().getAt(row);
        action = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        if (action) {
            switch (action[1]) {
                case 'update':
                    me.rowintranetdinas = record;
                    me.instantWindow("FormDataIntranetDinas", 900, "FORM DATA DINAS", "options", "absentrecordformdataintranetdinas");
                    break;
            }
        }
    },
    // added by Michael 2021.06.15 
    gridIntranetSakitActionColumnClick: function (view, cell, row, col, e) {
        var me, grid, record, row, action;
        me = this;
        grid = me.getGridsakitintranet();
        record = grid.getStore().getAt(row);
        action = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        if (action) {
            switch (action[1]) {
                case 'update':
                    me.rowintranetsakit = record;
                    me.instantWindow("FormDataIntranetSakit", 900, "FORM DATA Sakit", "options", "absentrecordformdataintranetsakit");
                    break;
            }
        }
    },
    // end added by Michael 2021.06.15 
    saveIntranetCutitoStore: function () {
        var me, form, formdata, grid, store, record, row, cutitype, counterupdatemysql;

        me = this;
        form = me.getFormdataintranetcuti();
        formdata = form.getForm();
        if (formdata.isValid()) {
            grid = me.getGridcutiintranet();
            grid.doInit();
            store = grid.getStore();
            row = formdata.getValues();
            cutitype = form.down("[name=absenttype_id]").getRawValue();
            row['absenttype_id_default'] = parseInt(row['absenttype_id_default']);
            row['cutitype'] = cutitype;
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            record.beginEdit();
            record.set(row);
            record.endEdit();
            store.commitChanges();

            counterupdatemysql = 0;
            if (row['absenttype_id_default'] !== row['absenttype_id']) {
                //kondisi update ke intranet mysql
                counterupdatemysql = 1;
            }
            if (row['hrd_comment_default'] !== row['hrd_comment']) {
                //kondisi update ke intranet mysql
                counterupdatemysql = 1;
            }
            if (counterupdatemysql > 0) {
                me.getFormdataintranetcuti().el.mask('Data in Intranet will be update, please wait...', 'x-mask-loading');
                me.tools.ajax({
                    params: {"paramdata": Ext.JSON.encode(row), configintranet: me.configintranet},
                    success: function (data, model) {
                        me.getFormdataintranetcuti().el.unmask();
                        form.up('window').close();
                        //added by michael 20220621 | saat save reload gridnya lagi agar dapat terupdate
                        store.reload();
                    }
                }).read('updatecutiintranetinchange');
            } else {
                form.up('window').close();
            }

        }
    },
    SaveIntranetcutiToCES: function () {
        var me, form, grid, store, rows, arraydata, record, indexcuti, msg, status, dataarraycuti, checkcuti,
                countererror, msgrerror;
        me = this;
        grid = me.getGridcutiintranet();
        rows = grid.getSelectionModel().getSelection();
        console.log(grid);
        console.log(rows);
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            
            if(rows[0]['data'].status != 'APPROVE'){
                Ext.Msg.alert('Error', 'Failed. Only APPROVE status can be processed.');
                return;            
            }
            
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].hrd_check == 'NO') {
                    arraydata.push(rows[i]['data']);
                }
            }
            if (arraydata.length) {
                me.getFormoptioncuti().el.mask('Please wait', 'x-mask-loading');
                me.tools.ajax({
                    params: {"paramdata": Ext.JSON.encode(arraydata), configintranet: me.configintranet},
                    success: function (data, model) {
                        record = data.others[1];
                        checkcuti = me.Checkcutinotvalid(record);
                        countererror = checkcuti['counter'];
                        msgrerror = checkcuti['message'];
                        if (countererror > 0) {
                            me.getFormoptioncuti().el.unmask();
                            Ext.Msg.alert('WARNING', msgrerror);
                        } else {
                            indexcuti;
                            for (indexcuti = 0; indexcuti < record.length; ++indexcuti) {
                                dataarraycuti = record[indexcuti];
                                dataarraycuti['basedata'] = 'intranet';
                                var checkreportto = arraydata[0]['reportoinmultiposition'].split(',');
                                var indexfound = checkreportto.indexOf(arraydata[0]['approve_by']);
                                if (indexfound >= 0) {
                                    // added by Michael 2021.05.19
                                    var fs = me.getFormsearch();
                                    var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                                    dataarraycuti['projectptid_opsi'] = projectptid_opsi;
                                    // end added by Michael 2021.05.19
                                    
                                    me.tools.ajax({
                                        params: dataarraycuti,
                                        success: function (datacuti, model) {
                                            status = datacuti.others[0][0].HASIL;
                                            msg = datacuti.others[0][0].MSG;
                                            Ext.Msg.alert('Info', msg);
                                        }
                                    }).read('createreason');
                                } else {
                                    Ext.Msg.alert('Error', "Failed when processing data.. 'Approved by' not listed in Personal 'report to'");
                                    me.getFormoptioncuti().el.unmask();
                                    return false;
                                }
                                
                            }
                            me.getDatacutiintranet();
                            me.getFormoptioncuti().el.unmask();
                            //Ext.Msg.alert('Info', 'Process finish');
                        }
                    }
                }).read('cutidetailintranet');
            } else {
                Ext.Msg.alert('Info', 'Only HRD Check is No will be processed..!');
            }
        }
    },
    SaveIntranettukarshiftToCES: function () {
        var me, form, grid, store, rows, arraydata, status, msg, indextukarshift, dataarraytukarshift;
        me = this;
        grid = me.getGridtukarshiftintranet();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            
            if(rows[0]['data'].status != 'APPROVE_BYREPORTTO'){
                Ext.Msg.alert('Error', 'Failed. Only APPROVE_BYREPORTTO status can be processed.');
                return;            
            }
            
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].hrd_check == 'NO') {
                    arraydata.push(rows[i]['data']);
                }
            }
            
            if (arraydata.length) {
                me.getFormoptiontukarshift().el.mask('Please wait', 'x-mask-loading');
                indextukarshift;
                for (indextukarshift = 0; indextukarshift < arraydata.length; ++indextukarshift) {
                    dataarraytukarshift = arraydata[indextukarshift];
                    if (dataarraytukarshift.absentdetail_id == undefined) {
                        dataarraytukarshift['absentdetail_id'] = 0;
                    }
                    dataarraytukarshift['basedata'] = 'intranet';
                    // added by Michael 2021.05.19
                    var fs = me.getFormsearch();
                    var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                    dataarraytukarshift['projectptid_opsi'] = projectptid_opsi;
                    // end added by Michael 2021.05.19
                    var checkreportto = arraydata[0]['reportoinmultiposition'].split(',');
                    var indexfound = checkreportto.indexOf(arraydata[0]['approve_byreportto']);
                    console.log(arraydata[0]['approve_byreportto']);
                    console.log(indexfound);
                    if (indexfound >= 0) {
                        me.tools.ajax({
                            params: dataarraytukarshift,
                            success: function (datatukarshift, model) {
                                status = datatukarshift.others[0][0].HASIL;
                                msg = datatukarshift.others[0][0].MSG;
                                Ext.Msg.alert('Info', msg);
                            }
                        }).read('createreason_tukarshift');
                    } else {
                        Ext.Msg.alert('Error', "Failed when processing data.. 'Approved by' not listed in Personal 'report to'");
                        me.getFormoptiontukarshift().el.unmask();
                        return false;
                    }
                }

                me.getFormoptiontukarshift().el.unmask();
                //Ext.Msg.alert('Info', 'Process finish');
                me.getDatatukarshiftintranet();
            } else {
                Ext.Msg.alert('Info', 'Only HRD Check is No will be processed..!');
            }
        }
    },
    Checkcutinotvalid: function (array) {
        var count = 0;
        var msg = [];
        for (var i = 0; i < array.length; ++i) {
            if (array[i].absentdetail_id == 0) {
                count++;
                msg.push(
                        "periode absent not yet formed  for  nik : " + array[i].nik
                        + " , name : " + array[i].name
                        + ", cuti type : " + array[i].cutitype_intranet
                        + ", fromdate : " + array[i].start_date
                        + ", untildate : " + array[i].end_date
                        + ", note : " + array[i].note + "<br/><br/>"
                        );
            }
        }
        return {"counter": count, "message": msg};
    },
    saveIntranetIjintoStore: function () {
        var me, form, formdata, grid, store, record, row, msg;
        me = this;
        form = me.getFormdataintranetijin();
        formdata = form.getForm();
        if (formdata.isValid()) {
            grid = me.getGridijinintranet();
            grid.doInit();
            store = grid.getStore();
            row = formdata.getValues();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            record.beginEdit();
            record.set(row);
            record.endEdit();
            store.commitChanges();
            if (row.absenttype_id > 0) {
                me.getFormdataintranetijin().el.mask('Data in Intranet will be update, please wait...', 'x-mask-loading');
                me.tools.ajax({
                    params: {"paramdata": Ext.JSON.encode(row), configintranet: me.configintranet},
                    success: function (data, model) {
                        me.getFormdataintranetijin().el.unmask();
                        form.up('window').close();
                    }
                }).read('updateijinintranetinchange');

            } else {
                msg = "Periode absent not yet formed Name : " + row.name
                        + ", Date : " + row.izin_date
                        + ", Note : " + row.description;
                Ext.Msg.alert('WARNING', msg);
                form.up('window').close();
            }

        }
    },
    SaveIntranetijinToCES: function () {
        var me, form, grid, store, rows, arraydata, status, msg, indexijin, dataarrayijin;
        me = this;
        grid = me.getGridijinintranet();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            
            if(rows[0]['data'].status != 'APPROVE'){
                Ext.Msg.alert('Error', 'Failed. Only APPROVE status can be processed.');
                return;            
            }
            
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].hrd_check == 'NO') {
                    arraydata.push(rows[i]['data']);
                }
            }
            
            if (arraydata.length) {
                arraydata['is_halfday'] = 0;
                me.getFormoptionijin().el.mask('Please wait', 'x-mask-loading');
                indexijin;
                for (indexijin = 0; indexijin < arraydata.length; ++indexijin) {
                    dataarrayijin = arraydata[indexijin];
                    if (dataarrayijin.absentdetail_id == undefined) {
                        dataarrayijin['absentdetail_id'] = 0;
                    }
                    dataarrayijin['basedata'] = 'intranet';
                    // added by Michael 2021.05.19
                    var fs = me.getFormsearch();
                    var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                    dataarrayijin['projectptid_opsi'] = projectptid_opsi;
                    // end added by Michael 2021.05.19
                    var checkreportto = arraydata[0]['reportoinmultiposition'].split(',');
                    var indexfound = checkreportto.indexOf(arraydata[0]['approve_by']);
                    if (indexfound >= 0) {
                        me.tools.ajax({
                            params: dataarrayijin,
                            success: function (dataijin, model) {
                                status = dataijin.others[0][0].HASIL;
                                msg = dataijin.others[0][0].MSG;
                                Ext.Msg.alert('Info', msg);
                            }
                        }).read('createreason');
                    } else {
                        Ext.Msg.alert('Error', "Failed when processing data.. 'Approved by' not listed in Personal 'report to'");
                        me.getFormoptionijin().el.unmask();
                        return false;
                    }
                }

                me.getFormoptionijin().el.unmask();
                //Ext.Msg.alert('Info', 'Process finish');
                me.getDataijinintranet();
            } else {
                Ext.Msg.alert('Info', 'Only HRD Check is No will be processed..!');
            }
        }
    },
    saveIntranetDinastoStore: function () {
        var me, form, formdata, grid, store, record, row;
        me = this;
        form = me.getFormdataintranetdinas();
        formdata = form.getForm();
        if (formdata.isValid()) {
            grid = me.getGriddinasintranet();
            grid.doInit();
            store = grid.getStore();
            row = formdata.getValues();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            record.beginEdit();
            record.set(row);
            record.endEdit();
            store.commitChanges();
            me.getFormdataintranetdinas().el.mask('Data in Intranet will be update, please wait...', 'x-mask-loading');
            me.tools.ajax({
                params: {"paramdata": Ext.JSON.encode(row), configintranet: me.configintranet},
                success: function (data, model) {
                    me.getFormdataintranetdinas().el.unmask();
                    form.up('window').close();
                }
            }).read('updatedinasintranetinchange');
        }
    },
    SaveIntranetdinasToCES: function () {
        var me, form, grid, store, rows, arraydata, status, msg, indexdinas, dataarraydinas;
        me = this;
        grid = me.getGriddinasintranet();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            
            if(rows[0]['data'].status != 'APPROVE'){
                Ext.Msg.alert('Error', 'Failed. Only APPROVE status can be processed.');
                return;            
            }
            
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].hrd_check == 'NO') {
                    arraydata.push(rows[i]['data']);
                }
            }
            if (arraydata.length) {
                me.getFormoptiondinas().el.mask('Please wait', 'x-mask-loading');
                indexdinas;
                for (indexdinas = 0; indexdinas < arraydata.length; ++indexdinas) {
                    dataarraydinas = arraydata[indexdinas];
                    if (dataarraydinas.parametertlk_id == undefined) {
                        dataarraydinas['parametertlk_id'] = 0;
                    }
                    dataarraydinas['basedata'] = 'intranet';

                    // added by Michael 2021.05.19
                    var fs = me.getFormsearch();
                    var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                    dataarraydinas['projectptid_opsi'] = projectptid_opsi;
                    // end added by Michael 2021.05.19

                    me.tools.ajax({
                        params: dataarraydinas,
                        success: function (datadinas, model) {
                            status = datadinas.others[0][0].HASIL;
                            msg = datadinas.others[0][0].MSG;
                            Ext.Msg.alert('Info', msg);
                        }
                    }).read('createtlk');

                }
                me.getFormoptiondinas().el.unmask();
                //Ext.Msg.alert('Info', 'Process finish');
                me.getDatadinasintranet();
            } else {
                Ext.Msg.alert('Info', 'Only HRD Check is No will be processed..!');
            }
        }
    },
    // added by Michael 2021.06.15 
    saveIntranetSakittoStore: function () {
        var me, form, formdata, grid, store, record, row;
        me = this;
        form = me.getFormdataintranetsakit();
        formdata = form.getForm();
        if (formdata.isValid()) {
            grid = me.getGridsakitintranet();
            grid.doInit();
            store = grid.getStore();
            row = formdata.getValues();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            record.beginEdit();
            record.set(row);
            record.endEdit();
            store.commitChanges();
            me.getFormdataintranetsakit().el.mask('Data in Intranet will be update, please wait...', 'x-mask-loading');
            me.tools.ajax({
                params: {"paramdata": Ext.JSON.encode(row), configintranet: me.configintranet},
                success: function (data, model) {
                    me.getFormdataintranetsakit().el.unmask();
                    form.up('window').close();
                }
            }).read('updatesakitintranetinchange');
        }
    },
    SaveIntranetsakitToCES: function () {
        var me, form, grid, store, rows, arraydata, status, msg, indexsakit, dataarraysakit;
        me = this;
        grid = me.getGridsakitintranet();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            
            if(rows[0]['data'].status != 'APPROVE'){
                Ext.Msg.alert('Error', 'Failed. Only APPROVE status can be processed.');
                return;            
            }
            
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].hrd_check == 'NO') {
                    arraydata.push(rows[i]['data']);
                }
            }
            if (arraydata.length) {
                me.getFormoptionsakit().el.mask('Please wait', 'x-mask-loading');
                indexsakit;
                for (indexsakit = 0; indexsakit < arraydata.length; ++indexsakit) {
                    dataarraysakit = arraydata[indexsakit];
                    if (dataarraysakit.parametertlk_id == undefined) {
                        dataarraysakit['parametertlk_id'] = 0;
                    }
                    dataarraysakit['basedata'] = 'intranet';

                    // added by Michael 2021.05.19
                    var fs = me.getFormsearch();
                    var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                    dataarraysakit['projectptid_opsi'] = projectptid_opsi;
                    // end added by Michael 2021.05.19

                    me.tools.ajax({
                        params: dataarraysakit,
                        success: function (datasakit, model) {
                            status = datasakit.others[0][0].HASIL;
                            msg = datasakit.others[0][0].MSG;
                            Ext.Msg.alert('Info', msg);
                        }
                    }).read('createreason');

                }
                me.getFormoptionsakit().el.unmask();
                //Ext.Msg.alert('Info', 'Process finish');
                me.getDatasakitintranet();
            } else {
                Ext.Msg.alert('Info', 'Only HRD Check is No will be processed..!');
            }
        }
    },
    // end added by Michael 2021.06.15 
    formOptionsCutiAfterrender: function () {
        var me, form, curdate;
        me = this;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        curdate = new Date();
        form = me.getFormoptioncuti();
        me.getGridcutiintranet().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                var filterdata = me.filterAbsenttypecuti(data.absenttype);
                me.tools.wesea(filterdata, form.down("[name=absenttype_id]")).comboBox();
            }
        }).read('absenttype');
    },
    formOptionsIjinAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        //me.getGridijinintranet().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES, DI DISABLE PER 03042018

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        form = me.getFormoptionijin();
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                var filterdata = me.filterAbsenttypeijin(data.absenttype);
                me.tools.wesea(filterdata, form.down("[name=absenttype_id]")).comboBox();
            }
        }).read('absenttype');
    },
    formOptionsDinasAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        me.getGriddinasintranet().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES
        form = me.getFormoptiondinas();

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');

    },
    // added by Michael 2021.06.15 
    formOptionsSakitAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        me.getGridsakitintranet().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES
        form = me.getFormoptionsakit();

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');

    },
    // end added by Michael 2021.06.15 
    filterAbsenttypecuti: function (param) {
        var data = [];
        Ext.each(param.data, function (value) {
            if (value.absenttypegroup_absenttypegroup_id == 2) {
                data.push(value);
            }
        });
        return {'data': data, 'model': param.model};
    },
    filterAbsenttypeijin: function (param) {
        var data = [];
        Ext.each(param.data, function (value) {
            if (value.absenttypegroup_absenttypegroup_id == 3 || value.absenttypegroup_absenttypegroup_id == 4) {
                data.push(value);
            }
        });
        return {'data': data, 'model': param.model};
    },
    formDataCutiAfterrender: function () {
        var me, form, griddetail, storedetail;
        me = this;
        form = me.getFormdataintranetcuti();
        form.loadRecord(me.rowintranetcuti);
        me.absenttype_id_default = me.rowintranetcuti.data.absenttype_id;
        me.hrd_check_cuti = me.rowintranetcuti.data.hrd_check;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19
        
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
                form.down("[name=department_id]").setValue(me.rowintranetcuti.data.department_id);
            }
        }).read('invalidabsentinit');

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.position, form.down("[name=position_id]")).comboBox();
                form.down("[name=position_id]").setValue(me.rowintranetcuti.data.position_id);
            }
        }).read('position');

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                var filterdata = me.filterAbsenttypecuti(data.absenttype);
                me.tools.wesea(filterdata, form.down("[name=absenttype_id]")).comboBox();
                form.down("[name=absenttype_id]").setValue(me.rowintranetcuti.data.absenttype_id);
            }
        }).read('absenttype');

        griddetail = me.getGridcutidetailintranet();
        griddetail.doInit();
        storedetail = griddetail.getStore().load({
            params: {
                mode_read: 'getdatacutidetailintranet',
                configintranet: me.configintranet,
                cuti_id: me.rowintranetcuti.data.cuti_id,
            },
            callback: function (data, model) {
                griddetail.attachModel(model);
            }
        });
    },
    formDataIjinAfterrender: function () {
        var me, form, griddetail, storedetail;
        me = this;
        form = me.getFormdataintranetijin();
        form.loadRecord(me.rowintranetijin);
        me.hrd_check_ijin = me.rowintranetijin.data.hrd_check;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
                form.down("[name=department_id]").setValue(me.rowintranetijin.data.department_id);
            }
        }).read('invalidabsentinit');

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.position, form.down("[name=position_id]")).comboBox();
                form.down("[name=position_id]").setValue(me.rowintranetijin.data.position_id);
            }
        }).read('position');

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                var filterdata = me.filterAbsenttypeijin(data.absenttype);
                me.tools.wesea(filterdata, form.down("[name=absenttype_id]")).comboBox();
                form.down("[name=absenttype_id]").setValue(me.rowintranetijin.data.absenttype_id);
            }
        }).read('absenttype');

    },
    formDataDinasAfterrender: function () {
        var me, form, griddetail, storedetail;
        me = this;
        form = me.getFormdataintranetdinas();
        form.loadRecord(me.rowintranetdinas);
        me.hrd_check_dinas = me.rowintranetdinas.data.hrd_check;
        console.log('me.rowintranetdinas.data.end_date ' + me.rowintranetdinas.data.end_date);
        console.log('me.rowintranetdinas.data.end_date_time ' + me.rowintranetdinas.data.end_date_time);

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
                form.down("[name=department_id]").setValue(me.rowintranetdinas.data.department_id);
            }
        }).read('invalidabsentinit');

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.position, form.down("[name=position_id]")).comboBox();
                form.down("[name=position_id]").setValue(me.rowintranetdinas.data.position_id);
            }
        }).read('position');

    },
    // added by Michael 2021.06.15
    formDataSakitAfterrender: function () {
        var me, form, griddetail, storedetail;
        me = this;
        form = me.getFormdataintranetsakit();
        form.loadRecord(me.rowintranetsakit);
        me.hrd_check_sakit = me.rowintranetsakit.data.hrd_check;
        console.log('me.rowintranetsakit.data.end_date ' + me.rowintranetsakit.data.end_date);
        console.log('me.rowintranetsakit.data.end_date_time ' + me.rowintranetsakit.data.end_date_time);

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
                form.down("[name=department_id]").setValue(me.rowintranetsakit.data.department_id);
            }
        }).read('invalidabsentinit');

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.position, form.down("[name=position_id]")).comboBox();
                form.down("[name=position_id]").setValue(me.rowintranetsakit.data.position_id);
            }
        }).read('position');

    }, 
    // end added by Michael 2021.06.15 
    
    // added by Wulan 2021.07.07
    formOptionsTukarshiftAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        //me.getGridtukarshiftintranet().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES, DI DISABLE PER 03042018

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        form = me.getFormoptiontukarshift();
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');
    },
    // end added by Wulan 20210707 

    //added by Michael 16/12/2021
    Formreminderabsensishow: function () {
        var me;
        me = this;
        //1370
        me.instantWindow("FormReminderAbsensi", 920, "Reminder Absensi", "reminder absensi", "absentrecordformreminderabsensi");
    },
    FromreminderabsensiAfterrender: function () {
        var me, form, dates, fromdate, untildate;
        me = this;
        form = me.getFormreminderabsensi();
        dates = me.getStartEnddatecurmonth();
        form.down('[name=fromdate]').setValue(dates.fromdate);
        form.down('[name=untildate]').setValue(dates.untildate);

        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();

        // me.getGridcutiintranet().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');
    },
    getDatareminderabsensi: function (flag) {
        var me, form, formvalue, grid, store, gridabsent, storeabsent, record, row;
        me = this;
        form = me.getFormreminderabsensi();
        formvalue = form.getForm().getValues();
        grid = me.getGridreminderabsensi();
        gridabsent = me.getGridabsentrecord();
        storeabsent = gridabsent.getStore();
        record = storeabsent.getAt(storeabsent.indexOf(gridabsent.getSelectionModel().getSelection()[0]));
        row = record.raw.employee;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19
        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'getdatareminderabsensi',
                // employee_id: row.employee_id,
                employee_id: form.down('[name=employee_id]').getValue(),
                department_id: form.down('[name=department_id]').getValue(),
                fromdate: form.down('[name=fromdate]').getRawValue(),
                untildate: form.down('[name=untildate]').getRawValue(),
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'employee_name', direction: 'ASC'});
            }
        });
    },
    sendEmailCiputra: function () {
        var me, form, dates, fromdate, untildate;
        me = this;
        form = me.getFormreminderabsensi();
        g = me.getGridreminderabsensi();
        

        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();

        var selects = g.getSelectionModel().getSelection();

        if (selects.length == 0) {
            me.tools.alert.warning("Tidak ada karyawan yang terpilih.");
            return;
        }

        /// cek email
        var noEmail = "";
        var emails = [];
        var arraydata = [];

        for (var i in selects) {
            if (selects[i]['data']['email_ciputra'] == "") {
                noEmail += selects[i]['data']['employee_name'] + ",";
            } else {
                emails.push(selects[i]['data']['email_ciputra'] + "##" + selects[i]['data']['employee_name']);
            }
            arraydata.push(selects[i]['data']);
        }

        if (noEmail.length > 0) {
            me.tools.alert.warning("Karyawan berikut tidak ada emailnya : " + noEmail + ". Silahkan mendaftarkan emailnya terlebih dahulu.");
            return;
        }

        // var emails = emails.join("~");
        
        var paramdata = Ext.JSON.encode(arraydata);

        form.setLoading(true);

        me.tools.ajax({
            params: {
                paramdata: paramdata,
                employee_id: form.down('[name=employee_id]').getValue(),
                department_id: form.down('[name=department_id]').getValue(),
                fromdate: form.down('[name=fromdate]').getRawValue(),
                untildate: form.down('[name=untildate]').getRawValue(),
                projectptid_opsi : projectptid_opsi,
                read_email: 'ciputra'
            },
            success: function (data, model) {
            }
        }).read('sendemailreminder');
                
                g.doInit();
                store = g.getStore().load({
                    params: {
                        mode_read: 'getdatareminderabsensi',
                        employee_id: form.down('[name=employee_id]').getValue(),
                        department_id: form.down('[name=department_id]').getValue(),
                        fromdate: form.down('[name=fromdate]').getRawValue(),
                        untildate: form.down('[name=untildate]').getRawValue(),
                        projectptid_opsi : projectptid_opsi
                    },
                    callback: function (data, model) {
                        g.attachModel(model);
                        g.store.sort({property: 'employee_name', direction: 'ASC'});
                        form.setLoading(false);
                        me.tools.alert.warning("Silahkan cek kembali kolom Send Email record yang anda pilih, untuk memastikan apakah pengiriman email anda berhasil/tidak");
                    }
                });
        
    },
    sendEmailGeneral: function () {
        var me, form, dates, fromdate, untildate;
        me = this;
        form = me.getFormreminderabsensi();
        g = me.getGridreminderabsensi();
        

        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();

        var selects = g.getSelectionModel().getSelection();

        if (selects.length == 0) {
            me.tools.alert.warning("Tidak ada karyawan yang terpilih.");
            return;
        }

        /// cek email
        var noEmail = "";
        var emails = [];
        var arraydata = [];

        for (var i in selects) {
            if (selects[i]['data']['email'] == "") {
                noEmail += selects[i]['data']['employee_name'] + ",";
            } else {
                emails.push(selects[i]['data']['email'] + "##" + selects[i]['data']['employee_name']);
            }
            arraydata.push(selects[i]['data']);
        }

        if (noEmail.length > 0) {
            me.tools.alert.warning("Karyawan berikut tidak ada emailnya : " + noEmail + ". Silahkan mendaftarkan emailnya terlebih dahulu.");
            return;
        }

        // var emails = emails.join("~");
        
        var paramdata = Ext.JSON.encode(arraydata);

        form.setLoading(true);

        me.tools.ajax({
            params: {
                paramdata: paramdata,
                employee_id: form.down('[name=employee_id]').getValue(),
                department_id: form.down('[name=department_id]').getValue(),
                fromdate: form.down('[name=fromdate]').getRawValue(),
                untildate: form.down('[name=untildate]').getRawValue(),
                projectptid_opsi : projectptid_opsi,
                read_email: 'general'
            },
            success: function (data, model) {
            }
        }).read('sendemailreminder');
                
                g.doInit();
                store = g.getStore().load({
                    params: {
                        mode_read: 'getdatareminderabsensi',
                        employee_id: form.down('[name=employee_id]').getValue(),
                        department_id: form.down('[name=department_id]').getValue(),
                        fromdate: form.down('[name=fromdate]').getRawValue(),
                        untildate: form.down('[name=untildate]').getRawValue(),
                        projectptid_opsi : projectptid_opsi
                    },
                    callback: function (data, model) {
                        g.attachModel(model);
                        g.store.sort({property: 'employee_name', direction: 'ASC'});
                        form.setLoading(false);
                        me.tools.alert.warning("Silahkan cek kembali kolom Send Email record yang anda pilih, untuk memastikan apakah pengiriman email anda berhasil/tidak");
                    }
                });

    },
    //end added by Michael 16/12/2021
    
    /* start added by ahmad riadi 06-06-2017 */
    Formviewlogshow: function () {
        var me;
        me = this;
        me.instantWindow("FormViewLog", 800, "View Log Absent Fingerprint", "view log", "absentrecordformviewlog");
    },
    getStartEnddatecurmonth: function () {
        var date, firstdate, lastdate, fromdate, fdate, frommnth, fromday,
                udate, untilmnth, untilday, untildate;

        date = new Date();
        firstdate = new Date(date.getFullYear(), date.getMonth(), 1);
        lastdate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        fdate = new Date(firstdate),
                frommnth = ("0" + (fdate.getMonth() + 1)).slice(-2),
                fromday = ("0" + fdate.getDate()).slice(-2);
        fromdate = [fromday, frommnth, fdate.getFullYear()].join("-");

        udate = new Date(lastdate),
                untilmnth = ("0" + (udate.getMonth() + 1)).slice(-2),
                untilday = ("0" + udate.getDate()).slice(-2);
        untildate = [untilday, untilmnth, udate.getFullYear()].join("-");
        return {'fromdate': fromdate, 'untildate': untildate}
    },
    FromviewLogAfterrender: function () {
        var me, form, dates, fromdate, untildate;
        me = this;
        form = me.getFormviewlog();
        dates = me.getStartEnddatecurmonth();
        form.down('[name=fromdate]').setValue(dates.fromdate);
        form.down('[name=untildate]').setValue(dates.untildate);
    },
    getDataviewlog: function (flag) {
        var me, form, formvalue, grid, store, gridabsent, storeabsent, record, row;
        me = this;
        form = me.getFormviewlog();
        formvalue = form.getForm().getValues();
        grid = me.getGridlog();
        gridabsent = me.getGridabsentrecord();
        storeabsent = gridabsent.getStore();
        record = storeabsent.getAt(storeabsent.indexOf(gridabsent.getSelectionModel().getSelection()[0]));
        row = record.raw.employee;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'getdatalogfingerprint',
                employee_id: row.employee_id,
                fromdate: form.down('[name=fromdate]').getRawValue(),
                untildate: form.down('[name=untildate]').getRawValue(),
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'date', direction: 'ASC'});
            }
        });
    },
    /* end added by ahmad riadi 06-06-2017 */

    //added by michael 02/12/2021
    getDataviewalllog: function (flag) {
        var me, form, formvalue, grid, store, gridabsent, storeabsent, record, row;
        me = this;
        form = me.getFormviewlog();
        formvalue = form.getForm().getValues();
        grid = me.getGridalllog();
        gridabsent = me.getGridabsentrecord();
        storeabsent = gridabsent.getStore();
        record = storeabsent.getAt(storeabsent.indexOf(gridabsent.getSelectionModel().getSelection()[0]));
        row = record.raw.employee;

        // gridall = me.getGridalllog();

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'getdataalllogfingerprint',
                employee_id: row.employee_id,
                fromdate: form.down('[name=fromdate]').getRawValue(),
                untildate: form.down('[name=untildate]').getRawValue(),
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'date', direction: 'ASC'});
            }
        });
    },
    //end added by michael 02/12/2021

    /* end added by ahmad riadi 06-04-2017 */

    //added by michael 02/12/2021
    Formviewalllogshow: function () {
        var me;
        me = this;
        me.instantWindow("FormViewAllLog", 800, "View all Log Absent Fingerprint", "view all log", "absentrecordformviewalllog");
    },
    //end added by michael 02/12/2021

    //start added by ahmad riadi 02-11-2017
    getDatatukeroff: function () {
        var me, form, formvalue, grid, store;
        me = this;
        form = me.getFormoptiontukeroff();
        formvalue = form.getForm().getValues();
        grid = me.getGridtukeroff();
        grid.doInit();
        
        /* edit by wulan sari 20191005
        store = grid.getStore().load({
            params: {
                mode_read: 'getdatatukeroff',
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'tukeroff_date', direction: 'DESC'});
            }
        });
        */

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19
       
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdatatukeroff',
            paramdata: Ext.JSON.encode(formvalue),
            // added by Michael 2021.05.19
            projectptid_opsi : projectptid_opsi
            // end added by Michael 2021.05.19
        };        
        store.currentPage = 1;
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'tukeroff_date', direction: 'DESC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    getFilterdatatukeroff: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptiontukeroff();
        formvalue = form.getForm().getValues();
        grid = me.getGridtukeroff();
        grid.doInit();

        /* edit by wulan sari 20191005
        store = grid.getStore().load({
            params: {
                mode_read: 'getdatatukeroff',
                paramdata: Ext.JSON.encode(formvalue),
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'tukeroff_date', direction: 'DESC'});
            }
        });
        */
       
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdatatukeroff',
            page: '1',
            paramdata: Ext.JSON.encode(formvalue),
        };        
        store.currentPage = 1;
        store = store.load({
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'tukeroff_date', direction: 'DESC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    formOptionsTukeroffAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        me.getGridtukeroff().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES
        form = me.getFormoptiontukeroff();

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');
    },
    gridtukeroffActionColumnClick: function (view, cell, row, col, e) {
        var me, grid, record, row, action;
        me = this;
        grid = me.getGridtukeroff();
        record = grid.getStore().getAt(row);
        action = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);

        if (action) {
            switch (action[1]) {
                case 'update':
                    me.rowtukeroff = record;
                    me.instantWindow("FormDataTukerOff", 900, "FORM DATA TUKER OFF", "options", "absentrecordformdatatukeroff");
                    break;
            }
        }
    },
    formDataTukerOffAfterrender: function () {
        var me, form;
        me = this;
        form = me.getFormdatatukeroff();
        form.loadRecord(me.rowtukeroff);

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
                form.down("[name=department_id]").setValue(me.rowtukeroff.data.department_id);
            }
        }).read('invalidabsentinit');

        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.shifttype, form.down("[name=dari_shifttype_id]")).comboBox();
                me.tools.wesea(data.shifttype, form.down("[name=ke_shifttype_id]")).comboBox();


                me.tools.ajax({
                    params: {
                        'employee_id': me.rowtukeroff.data.employee_id,
                        'date': me.rowtukeroff.data.dari_tanggal,
                    },
                    success: function (data, model) {
                        var status, record;
                        status = data.others[0][0].HASIL;
                        if (status) {
                            record = data.others[1];
                            form.down("[name=dari_shifttype_id]").setValue(record.shifttype_id);
                        }
                    }
                }).read('getdataabsentindate');


                me.tools.ajax({
                    params: {
                        code: 'OFF', //harus di set semua project pt memiliki kode shift OFF
                    },
                    success: function (data, model) {
                        form.down("[name=ke_shifttype_id]").setValue(data.shifttype.data[0].shifttype_id);
                    }
                }).read('getdatashift');

            }
        }).read('getdatashift');



    },
    saveTukerofftoStore: function () {
        var me, form, formdata, grid, store, record, row, msg, darishift;
        me = this;
        form = me.getFormdatatukeroff();
        formdata = form.getForm();
        if (formdata.isValid()) {
            darishift = form.down("[name=dari_shifttype_id]").valueModels[0].raw;
            console.log('darishift' + darishift);
            grid = me.getGridtukeroff();
            grid.doInit();
            store = grid.getStore();
            row = formdata.getValues();
            row['dari_shift'] = darishift.shifttype;
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            record.beginEdit();
            record.set(row);
            record.endEdit();
            store.commitChanges();
            form.up('window').close();
        }
    },
    saveTukeroff: function () {
        var me, form, grid, store, rows, arraydata, record, indexcuti, msg, status, dataarraycuti, checkcuti,
                countererror, msgrerror;
        me = this;
        grid = me.getGridtukeroff();
        rows = grid.getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                arraydata.push(rows[i]['data']);
            }

            if (arraydata.length) {
                me.getFormoptiontukeroff().el.mask('Please wait', 'x-mask-loading');
                me.tools.ajax({
                    params: {
                        "paramdata": Ext.JSON.encode(arraydata),
                    },
                    success: function (data, model) {
                        me.getFormoptiontukeroff().el.unmask();
                        Ext.Msg.alert('Info', 'Process finish');
                        me.getDatatukeroff();
                    }
                }).read('createtukeroff');
            }
        }
    },
    //end added by ahmad riadi 02-11-2017

    //added ahmad riadi 06-11-2017
    showformShiftinclick: function (index) {
        var me, form, grid, store, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(index);
        row = record.data;
        
        var absenttype_code = row.absenttype_code;
        if(absenttype_code == 'C-THN' || absenttype_code == 'C-BSR'){
            Ext.Msg.alert('Error', 'Can not change Shift, leave is exists.');
        } else {
            me.instantWindow("FormDataShift", 500, "FORM DATA UBAH SHIFT", "options", "absentrecordformdatashift");
        }
        /*
         if (row.shifttype_code != "") {           
         me.instantWindow("FormDataShift", 500, "FORM DATA UBAH SHIFT", "options", "absentrecordformdatashift");
         } else {
         Ext.Msg.alert('Info', 'Shift in column not found');
         }
         */

    },
    
    //added wulan sari 22-10-2021
    showformShiftdetailinclick: function (index) {
        var me = this;
        var rec = me.getGrid().getStore().getAt(index);
        
        me.instantWindow("FormDataShiftDetail", 720, "Detail Shift", "options", "absentrecordformdatashiftdetail");

        var f = me.getFormdatashiftdetail();
        var w = f.up("window");
        f.setLoading("Please wait..");
        
        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19
        
        var grid = me.getGrid();
        var store = grid.getStore();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                
        var recE = me.getSelectedEmployee();
        var gjc = me.getGridshiftdetail();
        gjc.getSelectionModel().setSelectionMode('SINGLE');
        gjc.doInit();
        gjc.doLoad(
           {
               employee_id: recE.get("employee_employee_id"),
               date: record.get("date"),
               absentdetail_id: record.get("absentdetail_id"),
               projectptid_opsi: projectptid_opsi
           }, function () {
            f.setLoading(false);
        });


    },
    
    formDataShiftAfterrender: function () {
        var me, form, grid, store, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        row = record.data;
        form = me.getFormdatashift();
        form.down('[name=absentdetail_id]').setValue(row.absentdetail_id);
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.shifttype, form.down("[name=shifttype_id]")).comboBox();
                form.down('[name=shifttype_id]').setValue(row.shifttype_shifttype_id);
            }
        }).read('getdatashift');
    },
    saveChangeshift: function () {
        var me, form, grid, store, record, row, formdata, formvalue, emId;
        me = this;
        form = me.getFormdatashift();
        formdata = form.getForm();
        if (formdata.isValid()) {
            emId = me.getSelectedEmployee();
            formvalue = formdata.getValues();
            form.el.mask('Please wait', 'x-mask-loading');
            me.tools.ajax({
                params: {
                    "paramdata": Ext.JSON.encode(formvalue),
                },
                success: function (data, model) {
                    form.el.unmask();
                    Ext.Msg.alert('Info', 'Process finish');
                    form.up('window').close();
                    me.getGridemployee().getSelectionModel().select(emId);
                }
            }).read('updateshiftbyabsentdetailid');
        }
    },
    
    // add by wulan 22 10 2021
    /*
    formDataShiftdetailAfterrender: function () {
        var me, form, grid, store, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        row = record.data;
        form = me.getFormdatashift();
        form.down('[name=absentdetail_id]').setValue(row.absentdetail_id);
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.shifttype, form.down("[name=shifttype_id]")).comboBox();
                form.down('[name=shifttype_id]').setValue(row.shifttype_shifttype_id);
            }
        }).read('getdatashiftdetail');
    },
  */
    
    /* start added by ahmad riadi 14-12-2017 */
    gridIntranetPdlkActionColumnClick: function (view, cell, row, col, e) {
        var me, grid, record, row, action;
        me = this;
        grid = me.getGridpdlk();
        record = grid.getStore().getAt(row);
        action = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        if (action) {
            switch (action[1]) {
                case 'update':
                    me.rowintranetpdlk = record;
                    me.instantWindow("FormDataIntranetPdlk", 900, "FORM DATA PDLK", "options", "absentrecordformdataintranetpdlk");
                    break;
            }
        }
    },

    getDatapdlkintranet: function (flag) {
        var me, form, formvalue, grid, store;
        me = this;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        form = me.getFormoptionpdlk();
        formvalue = form.getForm().getValues();
        grid = me.getGridpdlk();
        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'getdatapdlkintranet',
                configintranet: me.configintranet,
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'start_date', direction: 'ASC'});
            }
        });
    },
    getFilterdatapdlk: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        form = me.getFormoptionpdlk();
        formvalue = form.getForm().getValues();

        if (formvalue.department_id == undefined || formvalue.department_id == '') {
            formvalue['deptcode'] = '';
        } else {
            rawdept = form.down("[name=department_id]").valueModels[0].raw;
            formvalue['deptcode'] = rawdept.code;
        }

        if (formvalue.employee_id == undefined || formvalue.employee_id == '') {
            formvalue['employee_name'] = '';
        } else {
            rawemployee = form.down("[name=employee_id]").valueModels[0].raw;
            formvalue['employee_name'] = rawemployee.employee_name;
        }

        if (formvalue.hrd_checked == undefined || formvalue.hrd_checked == '') {
            formvalue['hrd_checked'] = 'NO';
        } else {
            formvalue['hrd_checked'] = formvalue.hrd_checked;
        }

        grid = me.getGridpdlk();
        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'filterpdlkintranet',
                configintranet: me.configintranet,
                paramdata: Ext.JSON.encode(formvalue),
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'start_date', direction: 'ASC'});

            }
        });
    },

    formOptionsPdlkAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        form = me.getFormoptionpdlk();
        me.getGridpdlk().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');

    },
    formDataPdlkAfterrender: function () {
        var me, form, griddetail, storedetail;
        me = this;
        form = me.getFormdatapdlk();
        console.log(me.rowintranetpdlk.data);
        form.down("[name=status]").setValue(me.rowintranetpdlk.data.status);
        form.loadRecord(me.rowintranetpdlk);
        me.hrd_check_pdlk = me.rowintranetpdlk.data.hrd_check;

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
                form.down("[name=department_id]").setValue(me.rowintranetpdlk.data.department_id);
            }
        }).read('invalidabsentinit');

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.position, form.down("[name=position_id]")).comboBox();
                form.down("[name=position_id]").setValue(me.rowintranetpdlk.data.position_id);
            }
        }).read('position');

    },
    saveIntranetPdlktoStore: function () {
        var me, form, formdata, grid, store, record, row;
        me = this;
        form = me.getFormdatapdlk();
        formdata = form.getForm();
        if (formdata.isValid()) {
            grid = me.getGridpdlk();
            grid.doInit();
            store = grid.getStore();
            row = formdata.getValues();
            record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
            record.beginEdit();
            record.set(row);
            record.endEdit();
            store.commitChanges();
            form.el.mask('Data in Intranet will be update, please wait...', 'x-mask-loading');
            me.tools.ajax({
                params: {"paramdata": Ext.JSON.encode(row), configintranet: me.configintranet},
                success: function (data, model) {
                    form.el.unmask();
                    form.up('window').close();
                }
            }).read('updatepdlkintranetinchange');
        }
    },

    SaveIntranetpdlkToCES: function () {
        var me, form, grid, store, rows, arraydata, status, msg, indexdata, dataarray;
        me = this;
        grid = me.getGridpdlk();
        rows = grid.getSelectionModel().getSelection();
        form = me.getFormoptionpdlk();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['data'].hrd_check == 'NO') {
                    arraydata.push(rows[i]['data']);
                }
            }
            if (arraydata.length) {
                form.el.mask('Please wait', 'x-mask-loading');
                indexdata;
                for (indexdata = 0; indexdata < arraydata.length; ++indexdata) {
                    dataarray = arraydata[indexdata];
                    if (dataarray.parametertlk_id == undefined) {
                        dataarray['parametertlk_id'] = 0;
                    }
                    dataarray['basedata'] = 'intranet';
                    dataarray['transaction'] = 'pdlk';
                    // added by Michael 2021.05.19
                    var fs = me.getFormsearch();
                    var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
                    dataarray['projectptid_opsi'] = projectptid_opsi;
                    // end added by Michael 2021.05.19

                    console.log(dataarray);
                    me.tools.ajax({
                        params: dataarray,
                        success: function (data, model) {
                            status = data.others[0][0].HASIL;
                            msg = data.others[0][0].MSG;
                        }
                    }).read('createtlk');

                }
                form.el.unmask();
                Ext.Msg.alert('Info', 'Process finish');
                me.getDatapdlkintranet();
            } else {
                Ext.Msg.alert('Info', 'Only HRD Check is No will be processed..!');
            }
        }
    },
    /* end added by ahmad riadi 14-12-2017 */

    /* start added by ahmad riadi 04-01-2018 */
    formOptionsOvertimeAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        form = me.getFormoptionsovertime();

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');

    },

    getDataovertimeintranet: function (flag) {
        var me, form, formvalue, grid, store;
        me = this;
        form = me.getFormoptionsovertime();
        formvalue = form.getForm().getValues();
        grid = me.getGridovertime();
        grid.doInit();
        store = grid.getStore().load({
            params: {
                mode_read: 'getdataovertimeintranet',
                configintranet: me.configintranet,
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'lembur_dari', direction: 'ASC'});
            }
        });
    },
    /* end added by ahmad riadi 04-01-2018 */

    /* start added by ahmad riadi 09-03-2018 */
    formOptionsAPIAfterrender: function () {
        var me, form, curdate;
        me = this;
        curdate = new Date();
        form = me.getFormoptionsapi();
        //me.getGridapi().getSelectionModel().setSelectionMode('SINGLE');//HANYA PILIH SATU KOLOM UNTUK DI PROSES

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.employeeb, form.down("[name=employee_id]")).comboBox();
            }
        }).read('employeeprojectpt');
        me.tools.ajax({
            params: {
                // added by Michael 2021.05.19
                projectptid_opsi : projectptid_opsi
                // end added by Michael 2021.05.19
            },
            success: function (data, model) {
                me.tools.wesea(data.department, form.down("[name=department_id]")).comboBox();
            }
        }).read('invalidabsentinit');
        me.getDataapiintranet();
    },
    getDataapiintranet: function (flag) {
        var me, form, formvalue, grid, store;
        me = this;
        
        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        form = me.getFormoptionsapi();
        formvalue = form.getForm().getValues();
        grid = me.getGridapi();
        grid.doInit();
        
        // edit by wulan 20191005
        /*
        store = grid.getStore().load({
            params: {
                mode_read: 'getdatabyapi',
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'transaction_date', direction: 'DESC'});
            }
        });
        */        
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdatabyapi'
        };
        
        store = store.load({
            // added by Michael 2021.05.19 
            params: {
                projectptid_opsi:projectptid_opsi
            },
            // end added by Michael 2021.05.19 
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'transaction_date', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    getFilterdatatransactionapi: function () {
        var me, form, formvalue, grid, store, rawdept, rawemployee, rawcuti;
        me = this;
        
        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19

        form = me.getFormoptionsapi();
        formvalue = form.getForm().getValues();
        grid = me.getGridapi();
        grid.doInit();
        
        // edit by wulan 20191005
        /*
        store = grid.getStore().load({
            params: {
                mode_read: 'getdatafilterbyapi',
                paramdata: Ext.JSON.encode(formvalue),
            },
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'transaction_date', direction: 'DESC'});
            }
        });
        */
        var store = grid.getStore();
        store.getProxy().extraParams = {
            mode_read: 'getdatafilterbyapi',
            paramdata: Ext.JSON.encode(formvalue),
        };
        
        store = store.load({
            // added by Michael 2021.05.19 
            params: {
                projectptid_opsi:projectptid_opsi
            },
            // end added by Michael 2021.05.19 
            callback: function (data, model) {
                grid.attachModel(model);
                grid.store.sort({property: 'transaction_date', direction: 'ASC'});
                Ext.apply(store, {pageSize: 25});
            }
        });
    },
    Processtransactionapi: function () {
        var me, form, formvalue, grid, store, rows, arraydata, rowdata;
        me = this;
        form = me.getFormoptionsapi();
        grid = me.getGridapi();
        rows = grid.getSelectionModel().getSelection();

        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected..!');
            return;
        } else {
            form.el.mask('Please wait', 'x-mask-loading');
            arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                rowdata = rows[i]['data']; //data dari api
                if (rowdata.for_transaction == 'tlk') {
                    me.processTlk(rowdata);
                } else if (rowdata.for_transaction == 'izin') {
                    me.processPermit(rowdata);
                } else if (rowdata.for_transaction == 'cuti') {
                    me.processLeave(rowdata);
                } else if (rowdata.for_transaction == 'gantishift') {
                    me.processGantishift(rowdata);
                }
            }
            form.el.unmask();
            //me.getDataapiintranet(); edit by wulan sari 20190523
        }

    },
    processTlk: function (param) {
        var me, data, status, msg, id, for_transaction;
        me = this;
        id = param['transaction_id'];
        for_transaction = param['for_transaction'];
        data = param;
        data['parametertlk_id'] = 0;
        data['tlk_project_type'] = param['tipe_tlk'];
        data['tlk_other'] = param['lokasi_tlk'];
        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        data['projectptid_opsi'] = projectptid_opsi;
        // end added by Michael 2021.05.19
        me.tools.ajax({
            params: data,
            success: function (data, model) {
                status = data.others[0][0].HASIL;
                msg = data.others[0][0].MSG;
                if (status > 0) {
                    //berhasil, maka update transaksi api, set is_proses 1
                    me.processFinishapi(id, for_transaction);
                } 
            }
        }).read('createtlk');

    },
    processLeave: function (param) {
        var me, data, id, status, msg, for_transaction;
        me = this;
        id = param['transaction_id'];
        for_transaction = param['for_transaction'];
        data = param;
        data['is_cuti'] = 1;
        data['is_halfday'] = param['is_halfday'];
        data['note'] = param['keterangan'];

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        data['projectptid_opsi'] = projectptid_opsi;
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: data,
            success: function (datacuti, model) {
                status = datacuti.others[0][0].HASIL;
                msg = datacuti.others[0][0].MSG;
                if (status > 0) {
                    //berhasil, maka update transaksi api, set is_proses 1
                    me.processFinishapi(id, for_transaction);
                }else{                  
                    Ext.Msg.alert('Info', msg);
                    //alert(msg);
                }
            }
        }).read('createreason');

    },
    processPermit: function (param) {
        var me, data, id, status, msg, for_transaction;
        me = this;
        id = param['transaction_id'];
        for_transaction = param['for_transaction'];
        data = param;
        data['is_halfday'] = param['is_halfday'];
        data['note'] = param['keterangan'];

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        data['projectptid_opsi'] = projectptid_opsi;
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: data,
            success: function (datacuti, model) {
                status = datacuti.others[0][0].HASIL;
                msg = datacuti.others[0][0].MSG;
                if (status > 0) {
                    //berhasil, maka update transaksi api, set is_proses 1
                    me.processFinishapi(id, for_transaction);
                }else{                  
                    Ext.Msg.alert('Info', msg);
                    //alert(msg);
                }
            }
        }).read('createreason');

    },
    processFinishapi: function (transaction_id, for_transaction) {
        var me;
        me = this;
        me.tools.ajax({
            params: {'transaction_id': transaction_id, 'for_transaction' : for_transaction},
            success: function (data, model) {
                
                // added by Wulan Sari 2018.04.27
                me.getFilterdatatransactionapi();
                
            }
        }).read('setsuccessprocessapi');
    },
    /* end added by ahmad riadi 09-03-2018 */
    
    // edit by wulan sari 20190523
    processGantishift: function (param) {
        var me, data, id, status, msg, for_transaction;
        me = this;
        id = param['transaction_id'];
        for_transaction = param['for_transaction'];
        data = param;
        data['note'] = param['keterangan'];

        me.tools.ajax({
            params: data,
            success: function (result, model) {
                status = result.others[0][0].HASIL;
                msg = result.others[0][0].MSG;
                if (status > 0) {
                    //berhasil, maka update transaksi api, set is_proses 1
                    me.processFinishapi(id, for_transaction);
                }else{
                                      
                    Ext.Msg.alert('Info', msg);
                    //alert(msg);
                }
            }
        }).read('gantishift');

    },
    /* end edit by wulan sari 20190523 */

    
    // edit by wulan sari 20200319
    inoutwfhOnClick: function () {
        var me, data, status, msg;
        me = this;
        
        var m = this.getFormsearch().down("[name=month_pick]").getValue();
        var y = this.getFormsearch().down("[name=year_pick]").getValue();
        
        me.tools.ajax({
            params: {m:m, y:y},
            success: function (result, model) {
                status = result.others[0][0].HASIL;
                msg = result.others[0][0].MSG;
                if (status > 0) {
                    alert('In/Out WFH Sucessfully generated');
                    me.emGrid().select(); // load grid
                }else{
                                      
                    Ext.Msg.alert('Info', msg);
                    //alert(msg);
                }
            }
        }).read('inoutwfh');

    },
    /* end edit by wulan sari 20200319 */
    
    // added by wulan sari 20200616
    gridStatusLemburClick: function (index) {
        var me = this;
        var rec = me.getGrid().getStore().getAt(index);
        
        me.instantWindow("FormOvertime", 920, "Lembur", "options", "absentrecordformovertime");

        var f = me.getFormovertime();
        var w = f.up("window");
        f.setLoading("Please wait..");
        
        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        // end added by Michael 2021.05.19
        
        var grid = me.getGrid();
        var store = grid.getStore();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        
        var recE = me.getSelectedEmployee();
        var gjc = me.getGridovertimedetail();
        gjc.getSelectionModel().setSelectionMode('SINGLE');
        gjc.doInit();
        gjc.doLoad(
           {
               employee_id: recE.get("employee_employee_id"),
               date: record.get("date"),
               // added by Michael 2021.05.19
               projectptid_opsi: projectptid_opsi
               // end added by Michael 2021.05.19
           }, function () {
            f.setLoading(false);
        });


    },
    
    // added by wulan sari 20200828
    reasonDetailOnClick: function (index) {
        var me = this;
        var rec = me.getGrid().getStore().getAt(index);
        
        me.instantWindow("FormReasondetail", 720, "Reason", "options", "absentrecordformreasondetail");

        var f = me.getFormreasondetail();
        var w = f.up("window");
        f.setLoading("Please wait..");
                
        var grid = me.getGrid();
        var store = grid.getStore();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                
        var recE = me.getSelectedEmployee();
        var gjc = me.getGridreasondetail();
        gjc.getSelectionModel().setSelectionMode('SINGLE');
        gjc.doInit();
        gjc.doLoad(
           {
               absentdetail_id: record.get("absentdetail_id")
           }, function () {
            f.setLoading(false);
        });


    },
    
    // add by wulan sari 20210527
    downloadTemplate:function(){
        window.open(document.URL+"app/hrd/uploads/msexcel/template/Format_Upload_Shift.xlsx");
    },
    gridTimePopup: function(index, dataIndex) {
        var me = this;
        var rec = me.getGrid().getStore().getAt(index);

        me.tools.ajax({
            params: { },
            success: function (data, model) {
                var count = data['others'][0][0]['HASIL'];
                if(count > 0){
                    var form          = me.getFormviewlog();
                    var grid          = me.getGridlog();
                    var timeType      = dataIndex.split("_")[1] + "_" + dataIndex.split("_")[2];
                    var timeIn        = me.tools.dateFunc(rec.get("in_" + timeType)).toHIS();
                    var timeOut       = me.tools.dateFunc(rec.get("out_" + timeType)).toHIS();

                    var tempDate      = new Date(rec.data.date);
                    var y             = tempDate.getFullYear();
                    var m             = ((tempDate.getMonth() + 1) < 10) ? "0" + (tempDate.getMonth() + 1): (tempDate.getMonth() + 1);
                    var d             = (tempDate.getDate() < 10) ? "0" + tempDate.getDate(): tempDate.getDate();
                    var formattedDate = d + "/" + m + "/" + y;
                    var absentDate    = formattedDate + " " + me.tools.dateFunc(rec.get(dataIndex)).toHIS();
                    var timeInDate    = formattedDate + " " + timeIn;
                    var timeOutDate   = formattedDate + " " + timeOut;

                    me.instantWindow("FormCorrectionAbsent", 600, "Correction Absent", "processcorrectionabsent", "toolProcessCorrectionAbsentWinId");

                    var f = me.getFormcorrectionabsent();
                    var w = f.up("window");
                    f.setLoading("Please wait..");

                    f.down("[name=absentrecorddate]").setValue(absentDate);

                    me.tools.ajax({
                        params: {
                            absentdetail_id: rec.get('absentdetail_id'),
                            time_type: timeType
                        },
                        success: function (data, model) {
                            var arrin = [];
                            var arrout = [];
                            var recin = null;
                            var recout = null;

                            for(var i=0;i<data.length;i++){
                                var d   = data[i]['timelog']['date'];
                                var t   = data[i]['timelog']['time'];

                                var tdt = new Date(d);
                                var td  = (tdt.getDate() < 10) ? "0" + tdt.getDate(): tdt.getDate();
                                var tm  = ((tdt.getMonth() + 1) < 10) ? "0" + (tdt.getMonth() + 1): (tdt.getMonth() + 1);
                                var ty  = tdt.getFullYear();
                                var tfd = td + "/" + tm + "/" + ty + " " + t.split(".")[0];

                                if(rec.data.date >= d && timeInDate > tfd){
                                    arrin.push(data[i]['timelog']);
                                }
                                
                                if(rec.data.date <= d && timeOutDate < tfd){
                                    arrout.push(data[i]['timelog']);
                                }
                            }

                            recin = { data:arrin, model:model }
                            recout = { data:arrout, model:model }

                            me.tools.wesea(recin, f.down("[name=timein_id]")).comboBox();
                            me.tools.wesea(recout, f.down("[name=timeout_id]")).comboBox();
                            
                            f.setLoading(false);
                        }
                    }).read('gettimeinlog');
                }else{
                    console.warn("No Permission");
                }
            }
        }).read('generalparametergeteditable');
    },
    correctionAbsentProcessOnClick: function(){
        var me = this;
        var f = me.getFormcorrectionabsent();

        var data = f.getForm().getValues();

        // added by Michael 2021.05.19
        var fs = me.getFormsearch();
        var projectptid_opsi = fs.down("[name=search_projectpt_id]").getValue();
        data['projectptid_opsi'] = projectptid_opsi;
        // end added by Michael 2021.05.19

        me.tools.ajax({
            params: data,
            success: function (data, model) {
//                 if (data['others'][0][0]['HASIL']) {
//                     me.tools.alert.info("Success");
//                 } else {
//                     me.tools.alert.warning(data['others'][0][0]['MSG']);
//                 }
//                 f.setLoading(false);
//                 f.up("window").close();
//                 me.emGrid().select();
//                 me.tlkProcessOnClicked = false;
// 
//             }
        }).read('correctionabsent');
    }
});