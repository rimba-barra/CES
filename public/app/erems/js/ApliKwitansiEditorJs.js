var ApliKwitansiEditorJs = {
    applicationName: 'erems',
    controllerName: '',
    stringUnik: 'APLIKWITEDSTRINGUNIK_',
    showHtml: function (viewName,viewParams) {
        var me = this;
        $.get(document.URL + 'app/' + me.applicationName + '/viewms/' + me.controllerName + '/' + viewName + '.html?_=' + new Date().getTime(), function (datatpl) {


            var output = Mustache.render(datatpl, viewParams);

            var mywindow = window.open('', 'Template Editor', 'height=400,width=1000');

            mywindow.document.write(output);
            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10  




        });
    },

    init: function () {
        var me = this;
        $(function () {
            /*
             $("#draggable").draggable();
             $("#draggable").resizable();
             $("#draggable2").draggable();
             $("#draggable2").resizable();
             $("#draggable3").draggable();
             $("#draggable3").resizable();
             $("#draggable4").draggable();
             $("#draggable4").resizable();
             $("#draggable4").draggable();
             $("#draggable4").resizable();
             $("#draggable5").draggable();
             $("#draggable5").resizable();
             $("#draggable6").draggable();
             $("#draggable6").resizable();
             */
            for (var i = 0; i < 7; i++) {
                $("#" + me.stringUnik + "" + i).draggable();
                $("#" + me.stringUnik + "" + i).resizable();
            }
        });


        $("#hitung").click(function () {
            var tableId = me.stringUnik + "myTable";
            var baris = 6;
            var kolom = 7;



            if ($('#' + tableId).length > 0) {
                //    $("body").remove('#' + tableId);
                $('#' + tableId).remove();
            }


            var tinggiAr = [0, 0, 0, 0, 0, 0, 0, 0]; // daftar ukuran tinggi element
            var tinggiKotakAr = [0, 0, 0, 0, 0, 0, 0, 0];
            var tinggiRealAr = [0, 0, 0, 0, 0, 0, 0, 0];
            var kiriAr = [0, 0, 0, 0, 0, 0];

            var props = [];



            var strInfo = "";

            var totalHeight = 0;

            $(".kotak").each(function (index) {
                //   console.log(index + ": " + $(this).text());
                var topEl = parseInt($(this).css("top"));
                var tinggiEl = parseInt($(this).css("height"));
                var kiriEl = parseInt($(this).css("left"));
                var lebarEl = parseInt($(this).css("width"));
                var kontenEl = $(this).text();

                totalHeight += tinggiEl;

                var tinggiReal = (totalHeight - tinggiEl) + topEl;

                strInfo += "index: " + index + " ,top : " + topEl + ",tinggi: " + tinggiEl + ", real top : " + tinggiReal + ", kiri : " + kiriEl + ", lebar: " + lebarEl + " <br/>";

                if (index > 0) {

                    tinggiAr[index] = tinggiReal - tinggiRealAr[index - 1];

                } else {
                    tinggiAr[index] = tinggiReal;
                }

                tinggiRealAr[index] = tinggiReal;
                tinggiKotakAr[index] = tinggiEl;

                props.push({
                    id: index,
                    top: topEl,
                    height: tinggiEl,
                    tinggiReal: tinggiReal,
                    tinggi: tinggiAr[index],
                    kiri: kiriEl,
                    lebar: lebarEl,
                    konten: kontenEl
                });

                kiriAr[index] = kiriEl;
            });



            props.sort(function (a, b) {
                return a.tinggiReal > b.tinggiReal
            });

            kiriAr.sort(function (a, b) {
                return a > b
            });

            for (var i = 0; i < props.length; i++) {
                var index = i;

                if (index > 0) {

                    //  tinggiAr[index] = props[i].tinggiReal - props[i-1].tinggiReal;
                    tinggiAr[index] = props[i].tinggiReal - props[i - 1].tinggiReal - 3;
                } else {
                    tinggiAr[index] = props[i].tinggiReal;
                }

            }

            var totalKiri = 0;
            for (var i = 0; i < kiriAr.length; i++) {
                var index = i;

                if (index > 0) {

                    kiriAr[index] = kiriAr[index] - totalKiri;
                    kiriAr[index] = kiriAr[index] + 2;
                } else {
                    kiriAr[index] = kiriAr[index];
                }

                totalKiri += kiriAr[index];

            }



            var spanRow = 20;
            var spanCol = 10;

            var w = 10; // lebar per kotak
            var h = 10; // tinggi per kotak

            var posX = Math.floor(props[0]['kiri'] / w);
            var posY = Math.floor(props[0]['tinggiReal'] / h);
            //  var panjang = 20;
            var panjang = Math.floor(props[0]['lebar'] / w);
            //  var tinggi  = 5;
            var tinggi = Math.floor(props[0]['height'] / h);

            var posYAdd = Math.floor((posY * 2) / h);
            var posXAdd = Math.floor((posX * 2) / w);

            var addLebarX = Math.floor((panjang * 2) / w);

            var addTinggiX = Math.floor((tinggi * 2) / w);

            posY = posY - posYAdd;
            posX = posX - posXAdd;

            if (posX >= 12) {
                posX = posX - 1;
            }

            panjang = panjang - addLebarX;
            if (panjang > 19) {
                panjang = panjang - 1;
            }

            tinggi = tinggi - addTinggiX;
            if (tinggi > 19) {
                tinggi = tinggi - 1;
            }


            var tableProps = [];

            tableProps.push(getProperties(0));
            tableProps.push(getProperties(1));
            tableProps.push(getProperties(2));
            tableProps.push(getProperties(3));
            tableProps.push(getProperties(4));
            tableProps.push(getProperties(5));



            var table = $('<table>').addClass('table_style').attr('id', tableId);

            var ar = [10, 11, 12, 13];

            var kol = 70;
            var bar = 40;

            for (i = 0; i < bar; i++) {



                var row = $('<tr>').addClass('bar');


                for (j = 0; j < kol; j++) {
                    var col = null;
                    // keajaiban terjadi di sini

                    if (i == tableProps[0].y && j > tableProps[0].x && j < tableProps[0].x + tableProps[0].lebar) {
                        //   col = $('<td>').addClass('barcol').width("10px").height("10px");
                    } else if (i >= tableProps[0].y + 1 && i <= tableProps[0].y + (tableProps[0].tinggi - 1) && j > tableProps[0].x && j < tableProps[0].x + tableProps[0].lebar + 1) {

                    } else if (i == tableProps[1].y && j > tableProps[1].x && j < tableProps[1].x + tableProps[1].lebar) {
                        //   col = $('<td>').addClass('barcol').width("10px").height("10px");
                    } else if (i >= tableProps[1].y + 1 && i <= tableProps[1].y + (tableProps[1].tinggi - 1) && j > tableProps[1].x && j < tableProps[1].x + tableProps[1].lebar + 1) {

                    } else if (i == tableProps[2].y && j > tableProps[2].x && j < tableProps[2].x + tableProps[2].lebar) {
                        //   col = $('<td>').addClass('barcol').width("10px").height("10px");
                    } else if (i >= tableProps[2].y + 1 && i <= tableProps[2].y + (tableProps[2].tinggi - 1) && j > tableProps[2].x && j < tableProps[2].x + tableProps[2].lebar + 1) {

                    } else if (i == tableProps[3].y && j > tableProps[3].x && j < tableProps[3].x + tableProps[3].lebar) {
                        //   col = $('<td>').addClass('barcol').width("10px").height("10px");
                    } else if (i >= tableProps[3].y + 1 && i <= tableProps[3].y + (tableProps[3].tinggi - 1) && j > tableProps[3].x && j < tableProps[3].x + tableProps[3].lebar + 1) {

                    } else if (i == tableProps[4].y && j > tableProps[4].x && j < tableProps[4].x + tableProps[4].lebar) {
                        //   col = $('<td>').addClass('barcol').width("10px").height("10px");
                    } else if (i >= tableProps[4].y + 1 && i <= tableProps[4].y + (tableProps[4].tinggi - 1) && j > tableProps[4].x && j < tableProps[4].x + tableProps[4].lebar + 1) {

                    } else if (i == tableProps[5].y && j > tableProps[5].x && j < tableProps[5].x + tableProps[5].lebar) {
                        //   col = $('<td>').addClass('barcol').width("10px").height("10px");
                    } else if (i >= tableProps[5].y + 1 && i <= tableProps[5].y + (tableProps[5].tinggi - 1) && j > tableProps[5].x && j < tableProps[5].x + tableProps[5].lebar + 1) {

                    } else {

                        // col = $('<td>').addClass('barcol').width("10px").height("10px"); 

                        if (i == tableProps[0].y && j == tableProps[0].x) {
                            //   col.attr('colspan',20).attr('rowspan',4).text('result ' + i);
                            col = $('<td>').addClass('barcol').width("200px").height("40px");
                            col.attr('colspan', tableProps[0].lebar).attr('rowspan', tableProps[0].tinggi).text(props[0].konten);

                            strInfo += "row:" + i + " , col:" + j + ", lebar " + tableProps[0].lebar + ", tableProps[0].tinggi : " + tableProps[0].tinggi + " <br/>";
                        } else if (i == tableProps[1].y && j == tableProps[1].x) {
                            //   col.attr('colspan',20).attr('rowspan',4).text('result ' + i);
                            col = $('<td>').addClass('barcol').width("200px").height("40px");
                            col.attr('colspan', tableProps[1].lebar).attr('rowspan', tableProps[1].tinggi).text(props[1].konten);

                            strInfo += "row:" + i + " , col:" + j + ", lebar " + tableProps[1].lebar + ", tableProps[0].tinggi : " + tableProps[1].tinggi + " <br/>";
                        } else if (i == tableProps[2].y && j == tableProps[2].x) {
                            //   col.attr('colspan',20).attr('rowspan',4).text('result ' + i);
                            col = $('<td>').addClass('barcol').width("200px").height("40px");
                            col.attr('colspan', tableProps[2].lebar).attr('rowspan', tableProps[2].tinggi).text(props[2].konten);

                            strInfo += "row:" + i + " , col:" + j + ", lebar " + tableProps[2].lebar + ", tableProps[0].tinggi : " + tableProps[2].tinggi + " <br/>";
                        } else if (i == tableProps[3].y && j == tableProps[3].x) {
                            //   col.attr('colspan',20).attr('rowspan',4).text('result ' + i);
                            col = $('<td>').addClass('barcol').width("200px").height("40px");
                            col.attr('colspan', tableProps[3].lebar).attr('rowspan', tableProps[3].tinggi).text(props[3].konten);

                            strInfo += "row:" + i + " , col:" + j + ", lebar " + tableProps[3].lebar + ", tableProps[0].tinggi : " + tableProps[3].tinggi + " <br/>";
                        } else if (i == tableProps[4].y && j == tableProps[4].x) {
                            //   col.attr('colspan',20).attr('rowspan',4).text('result ' + i);
                            col = $('<td>').addClass('barcol').width("200px").height("40px");
                            col.attr('colspan', tableProps[4].lebar).attr('rowspan', tableProps[4].tinggi).text(props[4].konten);

                            strInfo += "row:" + i + " , col:" + j + ", lebar " + tableProps[4].lebar + ", tableProps[0].tinggi : " + tableProps[4].tinggi + " <br/>";
                        } else if (i == tableProps[5].y && j == tableProps[5].x) {
                            //   col.attr('colspan',20).attr('rowspan',4).text('result ' + i);
                            col = $('<td>').addClass('barcol').width("200px").height("40px");
                            col.attr('colspan', tableProps[5].lebar).attr('rowspan', tableProps[5].tinggi).text(props[5].konten);

                            strInfo += "row:" + i + " , col:" + j + ", lebar " + tableProps[5].lebar + ", tableProps[0].tinggi : " + tableProps[5].tinggi + " <br/>";
                        } else {
                            col = $('<td>').addClass('barcol').width("10px").height("10px");
                        }






                    }


                    row.append(col);
                }
                table.append(row);
            }



            function getProperties(index) {
                var posX = Math.floor(props[index]['kiri'] / w);
                var posY = Math.floor(props[index]['tinggiReal'] / h);
                //  var panjang = 20;
                var panjang = Math.floor(props[index]['lebar'] / w);
                //  var tinggi  = 5;
                var tinggi = Math.floor(props[index]['height'] / h);

                var posYAdd = Math.floor((posY * 2) / h);
                var posXAdd = Math.floor((posX * 2) / w);

                var addLebarX = Math.floor((panjang * 2) / w);

                var addTinggiX = Math.floor((tinggi * 2) / w);

                posY = posY - posYAdd;
                posX = posX - posXAdd;

                if (posX >= 12) {
                    posX = posX - 1;
                }

                panjang = panjang - addLebarX;
                if (panjang > 19) {
                    panjang = panjang - 1;
                }

                tinggi = tinggi - addTinggiX;
                if (tinggi > 19) {
                    tinggi = tinggi - 1;
                }

                return {
                    lebar: panjang,
                    tinggi: tinggi,
                    x: posX,
                    y: posY
                }
            }



            $('body').append(table);



            $("#td_1_3").html("Test");




            $(".info").html(strInfo);

            var countCell = 0;
            var countBaris = 0;
            $("#" + tableId).find('td').each(function () {
                //   $(this).css("background-color","red");
                if (countCell >= kolom) {
                    countCell = 0;
                    countBaris++;
                }

                if (countCell == 6 && countBaris == 1) {
                    $(this).css("background-color", "red");
                }

                countCell++;
            });


        });

    }


};


