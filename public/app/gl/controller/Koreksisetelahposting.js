//6-11-2-18
//MODUL KOREKSI SETELAH POSTING SUDAH TIDAK DIPAKAI
//LANGSUNG REQUIRES JOURNAL COMPONENT SAJA
//KARENA SAMA PERSIS, HANYA MAIN FILTER
//override by DAVID

Ext.define('Gl.controller.Koreksisetelahposting', {
    extend: 'Gl.controller.Journal',
    controllerName: 'koreksisetelahposting',
    formWidth: 900,
    fieldName: 'voucher_no',
    bindPrefixName: 'Koreksisetelahposting',
    alias: 'controller.Koreksisetelahposting',
    init: function (application) {
    var me = this;
    this.control({
    	    'journalpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender,
                boxready: function (panel) {
                    me = this;
                    //me.Initpanelboxready(panel.ownerCt.id);
                    $("#menuitem-1258-itemEl").click(function() { //menu jurnal
                      $("#WINDOW-mnuJournal_header-targetEl .x-tool-close").click();
                    });
                }
            },
            'koreksisetelahpostingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender,
                boxready: function (panel) {
                    me = this;
                    //$("#WINDOW-mnuJournal_header-targetEl .x-tool-close").click();
                    //me.Initpanelboxready(panel.ownerCt.id);
                    $( "#menuitem-1257-itemEl" ).click(function() { //menu koreksi data
                      $("#WINDOW-mnuKoreksisetelahposting_header-targetEl .x-tool-close").click();
                    });
                }
            },
            'journalformsearch': {
                afterrender: this.FormSearchAfterRender,
                boxready: function (panel) {
                    var me = this;
                    $("#journalformsearchID input[name='voucher_no']").focus();
                    $("#journalformsearchID").keyup(function( e ) {
                        if (e.which == 13) {
                            e.preventDefault();
                            me.liveSearch(me);
                            return false;
                        }
                        if (e.altKey && e.which == 65) {
                            e.preventDefault();
                            $("#journalgridID #btnNew").click();
                            return false;
                        }
                    });

                    var win = panel.ownerCt.id;
                    if(win=="journalpanelID" && me.id=="Journal"){
                        $("#journalformsearchID-body #radio2-inputEl").click();
                        me.liveSearch(me);
                    }else if(win=="koreksisetelahpostingpanelID" && me.id=="Koreksisetelahposting"){
                        $("#journalformsearchID-body #radio2-inputRow").hide();
                        $("#journalformsearchID-body #radio3-inputRow").hide();
                        $("#journalgridID #btnNew").hide();
                        $("#journalformsearchID-body #radio1-inputEl").click();
                        me.liveSearch(me);
                    }
                }
            }
        })
    },
    panelAfterRender: function (el) {
        var me = this;
          setTimeout(
            function() {
              //Ext.getCmp("btnNew").click();
            }, 500);
          
        $("#WINDOW-mnu"+me.bindPrefixName+"-body .x-tool-collapse-left").click();
        $("#WINDOW-mnu"+me.bindPrefixName+"_header-targetEl .x-tool-maximize").click();
        console.log(me.bindPrefixName);
        this.initGeneralShortcut(el, this);
    },
});