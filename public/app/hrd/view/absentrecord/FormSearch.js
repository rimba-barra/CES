Ext.define('Hrd.view.absentrecord.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.absentrecordformsearch',
    requires: ['Hrd.view.absentrecord.GridEmployee', 'Hrd.template.combobox.Department',
        'Hrd.library.box.tools.2StateElement','Hrd.library.component.ComboboxDS2'],
    collapsed: false,
    initComponent: function() {
        var me = this;



        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
            // added by Michael 2021.05.19
                {
                    xtype: 'fieldset',
                    title: 'Project Pt',
                    layout: 'hbox',
                    width: '100%',
                    defaults: {
                        queryMode: 'local',
                        xtype: 'combobox',
                        displayField: 'name',
                        valueField: 'number',
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'search_projectpt_id',
                            fieldLabel: '',
                            margin: '0 10 0 0',
                            displayField: 'pt_name',
                            valueField: 'projectpt_id',
                            readOnly: false,
                            allowBlank: true,
                            matchFieldWidth: false,
                            selectOnFocus :true,
                            queryMode: 'local',
                            tpl: Ext.create('Ext.XTemplate',
                                            '<table class="x-grid-table">',
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

                    ]
                },
            // end by Michael 2021.05.19 
                {
                    xtype: 'fieldset',
                    title: 'Month - Year',
                    layout: 'hbox',
                    width: '100%',
                    defaults: {
                        queryMode: 'local',
                        xtype: 'combobox',
                        displayField: 'name',
                        valueField: 'number',
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'ds2combobox',
                            mode_read: 'monthfilter',
                            displayField: 'month',
                            valueField: 'month',
                            fieldLabel: '',
                            name: 'month_pick',
                            margin: '0 10 0 0'
                        },
                        {
                            name: 'year_pick',
                            xtype: 'ds2combobox',
                            mode_read: 'yearfilter',
                            displayField: 'year',
                            valueField: 'year',
                            fieldLabel: '',
                            flex: 1
                                    //  store: years,
                                    //  emptyField: 'year'
                        }

                    ]
                },
                                
                // added by Wulan Sari 2018.04.26
                {
                    name: 'pilihan_filter',
                    xtype: 'radiogroup',
                    defaults: {
                        xtype: 'radiofield',
                    },
                    items: [
                        {
                            boxLabel: 'Department',
                            name: 'pilihan_filter',
                            inputValue: 'department',
                            checked:true
                        }, {
                            boxLabel: 'Kelompok',
                            name: 'pilihan_filter',
                            inputValue: 'kelompok'
                        },
                    ]
                },
                // end by Wulan Sari 2018.04.26               
                
                
                /*   {
                 name: 'search_department_id',
                 xtype: 'cbdepartment'
                 },*/
                {
                    //queryMode: 'local',
                    //xtype: 'combobox',
                    xtype: 'ds2combobox',
                    mode_read: 'departmentfilter',
                    displayField: 'code',
                    valueField: 'department_id',
                    name: 'search_department_id',
                    // store:departments,
                    fieldLabel: '', 
                    width:200,
                    // displayField: 'department',
                    //  valueField: 'department_id',
                },
                
                
                // added by Wulan Sari 2018.04.26
                {
                    xtype: 'combobox',
                    displayField: 'name',
                    valueField: 'kelompokabsensi_id',
                    name: 'search_kelompokabsensi_id',
                    fieldLabel: '', 
                    width:200,
                    hidden:true
                },                
                // end by Wulan Sari 2018.04.26              
                
                
                {
                    margin: '10 0 0 0',
                    xtype: 'absentrecordemployeegrid'
                }
                /* {
                 margin: '10 0 0 0',
                 xtype: '2stateelement',
                 notFoundEl:'Employee list not found...',
                 foundEl:'absentrecordemployeegrid'
                 }*/
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                ]
            }
        ];
        return dockedItems;
    }
});