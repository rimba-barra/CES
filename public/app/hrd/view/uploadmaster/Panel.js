Ext.define('Hrd.view.uploadmaster.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    alias: 'widget.uploadmasterpanel',
    requires: ['Hrd.template.ComboBoxFields'],
    itemId: 'UploadMaster',
    layout: 'fit',
    autoScroll: true,
    height: '300px',
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();



        var based = [{
                number: 1,
                name: 'Division'
            }, {
                number: 2,
                name: 'Category ( Golongan )'
            }, {
                number: 3,
                name: 'N.I.K'
            }, {
                number: 4,
                name: 'Group ( Kelompok)'
            }];

        var basedStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: based
        });




        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: 'hbox',
                    bodyPadding: 10,
                    itemId: 'projectptFormID',
                    width: '100%',
                    autoScroll: true,
                    height: '200px',
                    defaults: {
                        xtype: 'combobox',
                        margin: '10px 0'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'project_project_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'project_name'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_pt_id'
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'pt_name'
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Upload Master Data',
                            labelWidth: 100,
                            margin: '0 20px 0 0',
                            layout: 'vbox',
                            width: 200,
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    fieldLabel: '',
                                    // Arrange radio buttons into two columns, distributed vertically

                                    labelWidth: 1,
                                    width: '100%',
                                    layout: 'vbox',
                                    defaults: {
                                        margin: '0 7 0 0'
                                    },
                                    flex: 3,
                                    items: [
                                        {
                                            boxLabel: 'Department', name: 'upload_type', inputValue: "uploadmaster_department"
                                        },
                                        {
                                            boxLabel: 'Banding', name: 'upload_type', inputValue: "uploadmaster_banding"
                                        },
                                        {
                                            boxLabel: 'Group', name: 'upload_type', inputValue: "uploadmaster_group"
                                        },
                                        // {
                                        //     boxLabel: 'JobFamily', name: 'upload_type', inputValue: "uploadmaster_jobfamily"
                                        // },
                                        {
                                            boxLabel: 'Position', name: 'upload_type', inputValue: "uploadmaster_position"
                                        },
                                        {
                                            boxLabel: 'Employee', name: 'upload_type', inputValue: "uploadmaster_employee"
                                        },
                                        {
                                            boxLabel: 'CareerTransition (Employee)', name: 'upload_type', inputValue: "uploadmaster_careertransition"
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Parameters',
                            flex: 1,
                            layout: 'vbox',
                            margin: '0 20px 0 0',
                            items: [
                                
                                
                                {
                                    xtype: 'combobox',
                                    name: 'projectpt_id',
                                    fieldLabel: 'ProjectPt',
                                    width:400,
                                    displayField: 'project_name',
                                    valueField: 'projectpt_id',
                                    readOnly: false,
                                    allowBlank: true,
                                    matchFieldWidth: false,
                                    selectOnFocus :true,
                                    queryMode: 'local',
                                    tpl: Ext.create('Ext.XTemplate',
                                    '<table class="x-grid-table" width="500px" >',
                                      '<tr class="x-grid-row">',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Project Name</div></th>',
                                          '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                                      '</tr>',
                                      '<tpl for=".">',
                                          '<tr class="x-boundlist-item">',
                                              '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                                              '<td><div class="x-grid-cell x-grid-cell-inner">{pt_name}</div></td>',                              
                                          '</tr>',
                                      '</tpl>',
                                   '</table>'
                                    )
                                },
                                // {
                                //     xtype: 'combobox',
                                //     name: 'ptpt_id',
                                //     fieldLabel: 'Pt',
                                //     width:400,
                                //     displayField: 'ptpt_name',
                                //     valueField: 'ptpt_id',
                                //     readOnly: false,
                                //     allowBlank: true,
                                //     matchFieldWidth: false,
                                //     selectOnFocus :true,
                                //     queryMode: 'local',
                                //     tpl: Ext.create('Ext.XTemplate',
                                //     '<table class="x-grid-table" width="500px" >',
                                //       '<tr class="x-grid-row">',
                                //           '<th width="100px"><div class="x-column-header x-column-header-inner">Pt Name</div></th>',
                                //       '</tr>',
                                //       '<tpl for=".">',
                                //           '<tr class="x-boundlist-item">',
                                //               '<td><div class="x-grid-cell x-grid-cell-inner">{ptpt_name}</div></td>',                              
                                //             '</tr>',
                                //         '</tpl>',
                                //     '</table>'
                                //     )
                                // },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'employee_id',
                                    fieldLabel: 'Employee',
                                    width:400,
                                    displayField: 'employee_name',
                                    valueField: 'employee_id',
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
                                            width:50
                                        },
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'View File',
                                            itemId: 'view_file',
                                            action:'view_file'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'Download Template',
                                            itemId: 'download_template_file',
                                            action:'download_template_file',
                                            margin: '10 0px',
                                            disabled: true
                                        },
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'Download ProjectPt',
                                            itemId: 'download_projectpt',
                                            action:'download_projectpt',
                                            margin: '10 10px',
                                            disabled: true
                                        }
                                    ]
                                },
                            ]
                        },
                    ],
                    dockedItems: {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        layout: {
                            padding: 6,
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'hiddenfield',
                                action: 'view',
                                padding: 5,
                                itemId: 'btnSearch',
                                iconCls: 'icon-save',
                                text: 'View Report'
                            },
                            {
                                xtype: 'tbfill',
                            },                            
                            {
                                xtype: 'button',
                                action: 'export',
                                padding: 5,
                                itemId: 'btnUpload',
                                iconCls: 'icon-save',
                                text: 'Upload Excel'
                            },
                            {
                                xtype: 'button',
                                action: 'viewtable',
                                padding: 5,
                                itemId: 'btnViewTable',
                                iconCls: 'icon-save',
                                text: 'View Table'
                            }

                        ]
                    }

                }
            ]
        });

        me.callParent(arguments);
    }


});