<?php

/**
 * Description of Default
 *
 * @author David-MIS
 */
class Erems_Models_Suratperingatan_BmwCilegon {
    
    public function getHTMLold(){
        return '<style>
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
                <p class="spstyle_p" align="right">Jakarta, <b>{{tanggal_print_w}}</b></p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p class="spstyle_p">No. Ref : <b>{{max_sp_no}}</b><br/>
                    Hal : Pemberitahuan ke <b>{{max_sp}}</b></p>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>

                <br>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">
                Bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli rumah Blok <b>{{unit_number}}</b> kawasan {{cluster}} , bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> belum melaksanakan pembayaran atas angsuran yang telah jatuh tempo, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah):
                </div>
                <br/>

                <table><tbody><tr style="background-color: #e8e9ea;font-weight: bold;"><td>Tagihan</td>
                <td>Termin</td>
                <td>Tanggal Jatuh Tempo</td><td>Nilai Tagihan</td>
                        <!--<td>Keterlambatan (hari) </td><td>Nomor SP - Tanggal SP</td>
                        -->
                        <td>Denda Keterlambatan ( s/d {{max_date}} )*</td>
                        <td>Total Dibayar ( s/d {{max_date}} )*</td>
                        </tr> 
                {{{list_tagihan}}}
                </tbody></table>
                <br/>
                <div class="amiddle">
                Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tgl. terhutang.<br/>

                Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:<br/>
                a.  Transfer ke : <b>PT. CAKRADIGDAYA LOKARAYA a/c. 539.032.9999 BCA Cab.Citra Garden 2-Citra Niaga kalideres, Jakarta Barat.</b> Mohon mencantumkan blok, no. rumah, dan nama pemesan pada kolom berita di slip transfer (bukti transfer mohon <b>difax ke 6198213</b> Collection dan segera ditukar dengan kwitansi Citra Garden City), atau <br/>
                b.  Membayar langsung ke kasir penerimaan City Management Office, Citra 2 Ext. Blok BG. 2A No. 01, Citra Garden City, Jakarta Barat dengan cash, giro/cek jatuh tempo atau debit BCA.  
                 <br/><br/>
                Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi collection di <b>no. telp. 6198177 ext. 604/605.</b>
                 <br/><br/>
                Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu membatalkan pemesanan rumah tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali rumah tersebut kepada pihak lain
                 <br/><br/>

                Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu  kami ucapkan terima kasih.
                </div>
                <br/><br/>
                Hormat Kami,</br>
                <b>PT. CAKRADIGDAYA LOKARAYA</b>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <b>NOVI LIANAWATI</b><br/>
                Manager Keuangan
                </p>

                <p class="spstyle_p_small"><u>*Note : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</u></p>

                </body>
                ';
    }
    
    public function getListTagihanHTML($params){
        $schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb=0;
        $ttlremaining_balance=0;
        $table = "";

        foreach($schedule as $row){
            $ttldenda_terlambatb=$ttldenda_terlambatb+$row["denda_terlambatb"];
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
            $table .='<tr><td>'.$row["scheduletype"].'</td><td>'.$row["termin"].'</td><td>'.date('d-m-Y',strtotime($row["duedate"])).'</td><td>Rp. '.Erems_Box_Tools::toCurrency($row["remaining_balance"]).'</td>
                <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> <td>Rp. '.Erems_Box_Tools::toCurrency($row["denda_terlambatb"]).'</td><td>Rp. '.Erems_Box_Tools::toCurrency($row["remaining_balance"]+$row["denda_terlambatb"]).'</td></tr>';
        }

        $table .='<tr><td>&nbsp</td><td>&nbsp</td><td>Total </td><td>Rp. '.Erems_Box_Tools::toCurrency($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td>Rp. '.Erems_Box_Tools::toCurrency($ttldenda_terlambatb).'</td><td>Rp. '.Erems_Box_Tools::toCurrency($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

        return $table;
    }
    
    public function getHTMLdefault(){
       return $this->getHTML();
    }

    public function getHTML($spke=null){

        $tpl1=
        '<style>
                table {
                    border-collapse: collapse;
                }
                table, td, th {
                    border: 1px solid black;
                    font-size:12px;
                }
                td{
                    padding:2px 10px;
                }
                body{
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
                <p class="spstyle_p" align="right">Jakarta, <b>{{tanggal_print_w}}</b></p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p class="spstyle_p">No. Ref : <b>{{max_sp_no}}</b><br/>
                    Hal : Pemberitahuan ke <b>{{max_sp}}</b></p>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>

                <br>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';
            
            $tpl2 = 
                'Menindaklanjuti <b>Surat Pemberitahuan {{sp_ke_before}}</b> kami tanggal {{sp_date_before}} No. {{sp_no_before}}. ';

            $tpl3 = 
                'Bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli rumah Blok <b>{{unit_number}}</b> kawasan {{cluster}} , bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> belum melaksanakan pembayaran atas angsuran yang telah jatuh tempo, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah):
                </div>
                <br/>

                <table><tbody><tr style="background-color: #e8e9ea;font-weight: bold;"><td>Tagihan</td>
                <td>Termin</td>
                <td>Tanggal Jatuh Tempo</td><td>Nilai Tagihan</td>
                        <!--<td>Keterlambatan (hari) </td><td>Nomor SP - Tanggal SP</td>
                        -->
                        <td>Denda Keterlambatan ( s/d {{max_date}} )*</td>
                        <td>Total Dibayar ( s/d {{max_date}} )*</td>
                        </tr> 
                {{{list_tagihan}}}
                </tbody></table>
                <br/>
                <div class="amiddle">
                Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tgl. terhutang.<br/>

                Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:<br/>
                a.  Transfer ke : <b>PT. CAKRADIGDAYA LOKARAYA a/c. 539.032.9999 BCA Cab.Citra Garden 2-Citra Niaga kalideres, Jakarta Barat.</b> Mohon mencantumkan blok, no. rumah, dan nama pemesan pada kolom berita di slip transfer (bukti transfer mohon <b>difax ke 6198213</b> Collection dan segera ditukar dengan kwitansi Citra Garden City), atau <br/>
                b.  Membayar langsung ke kasir penerimaan City Management Office, Citra 2 Ext. Blok BG. 2A No. 01, Citra Garden City, Jakarta Barat dengan cash, giro/cek jatuh tempo atau debit BCA.  
                 <br/><br/>
                Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi collection di <b>no. telp. 6198177 ext. 604/605.</b>
                 <br/><br/>

                 ';

            $tpl6 = ', kami tegaskan kepada Bapak/Ibu selaku pembeli rumah Blok <b>{{unit_number}}</b> kawasan {{cluster}}, bahwa pemesanan rumah tersebut menjadi batal.
                    <br/>
                    Keseluruhan uang yang telah Bapak/Ibu bayarkan  tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali rumah tersebut kepada pihak lain. 
                     
                    <br/>
                    Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.

                <br/><br/> ';    

            $tpl4 =  '
                Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu membatalkan pemesanan rumah tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali rumah tersebut kepada pihak lain
                 <br/><br/>';

            $tpl5 .= 'Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu  kami ucapkan terima kasih.
                </div>
                <br/><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
                <b>PT. CAKRADIGDAYA LOKARAYA</b>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <b>NOVI LIANAWATI</b><br/>
                Manager Keuangan
                </p>

                <p class="spstyle_p_small"><u>*Note : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</u></p>

                </body>
                ';
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl5;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl3.$tpl5;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl2.$tpl3.$tpl4.$tpl5;
        }
        elseif($spke==4){
            $tpl = $tpl1.$tpl2.$tpl6.$tpl5;
        }else{
            $tpl = $tpl1.$tpl3.$tpl5;
        }
        
        return $tpl; 
    }
    
}
