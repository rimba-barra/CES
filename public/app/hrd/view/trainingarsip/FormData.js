Ext.define('Hrd.view.trainingarsip.FormData', {
    alias: 'widget.trainingarsipformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
                {
                    xtype:'hiddenfield',
                    name:'trainingarsip_id'
                },
                {
                    xtype:'hiddenfield',
                    name:'file_name'
                },
                {
                                    xtype: 'combobox',
                                    name: 'trainingschedule_id',
                                    fieldLabel: 'Training Schedule',
                                    width:400,
                                    displayField: 'trainingname',
                                    valueField: 'trainingschedule_id',
                                    readOnly: false,
                                    allowBlank: true,
                                    matchFieldWidth: false,
                                    selectOnFocus :true,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="500px" >',
                                      '<tr class="x-grid-row">',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Training Name</div></th>',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Periode</div></th>',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Batch</div></th>',
                                      '</tr>',
                                      '<tpl for=".">',
                                          '<tr class="x-boundlist-item">',
                                              '<td ><div class="x-grid-cell x-grid-cell-inner">{trainingname}</div></td>',
                                              '<td><div class="x-grid-cell x-grid-cell-inner">{periode}</div></td>',
                                              '<td><div class="x-grid-cell x-grid-cell-inner">{batch}</div></td>',                              
                                          '</tr>',
                                      '</tpl>',
                                   '</table>'
                                    )
                                },
                {
                    xtype: 'textfield',
                    name:'periode',
                    fieldLabel:'Periode',
                    readOnly: true,
                },
                {
                    xtype: 'textfield',
                    name:'batch',
                    fieldLabel:'Batch',
                    readOnly: true,
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'file_name_show',
                            fieldLabel: 'File Name',
                            readOnly: true,
                            width:400
                        },
                        {
                            xtype: 'filefield',
                            fieldLabel: '',
                            itemId: 'file_name_upload',
                            name: 'file_name_upload',
                            buttonOnly: true,
                            buttonText: 'Browse',
                            width:105
                        }
                    ]
                },
                {
                    xtype:'button',
                    fieldLabel:' ',
                    text:'VIEW FILE',
                    action:'lihat_file'
                },
                {
                    xtype:'textareafield',
                    cols:50,
                    fieldLabel:'Description',
                    name:'description'
                },
                //added by anas 28042022
                {
                    xtype: 'checkbox',
                    boxLabel: 'Publish to Intranet',
                    fieldLabel:'&nbsp;',
                    name: 'publish',
                    checked: false,
                    inputValue: '1',
                    uncheckedValue: '0',
                },
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});