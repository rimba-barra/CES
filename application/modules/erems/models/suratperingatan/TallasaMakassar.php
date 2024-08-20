<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_TallasaMakassar
{

    public function tgl_indo($tanggal)
    {
        $bulan = array(
            1 =>   'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        );
        $pecahkan = explode('-', $tanggal);
        return $pecahkan[2] . ' ' . $bulan[(int)$pecahkan[1]] . ' ' . $pecahkan[0];
    }

    public function getListTagihanHTML($params)
    {
        $schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb = 0;
        $ttlremaining_balance = 0;
        $table = "";

        foreach ($schedule as $row) {
            if ($row['indicatorname'] == 'denda') {
                $denda = round($row["remaining_denda"]);
            } else {
                $denda = round($row["denda_terlambatb"]);
            }
           // $ttldenda_terlambatb = $ttldenda_terlambatb + $denda; 
            $ttldenda_terlambatb = $ttldenda_terlambatb + $row["remaining_denda"];
            $ttlremaining_balance = $ttlremaining_balance + $row["remaining_balance"];
            $table .= '<tr>
                        <!--<td>' . $row["scheduletype"] . '</td>
                        <td>' . $row["termin"] . '</td>-->
                        <td>' . $this->tgl_indo(date('Y-m-d', strtotime($row["duedate"]))) . '</td>
                        <td align="right">Rp. ' . number_format($row["remaining_balance"]) . '</td>
                        <!--<td>' . $row["hari_terlambatb"] . '</td><td>' . $row["sp_no"] . '</td>--> 
                        <!--<td align="right">Rp. ' . number_format($denda) . '</td>
                        <td align="right">Rp. ' . number_format($row["remaining_balance"] + round($denda)) . '</td> -->
                        <td align="right">Rp. ' . number_format($row["remaining_denda"]) . '</td> 
                        <td align="right">Rp. ' . number_format($row["remaining_balance"] + $row["remaining_denda"]) . '</td>
                    </tr>';
        }

        $table .= '<tr><!--<td>&nbsp</td><td>&nbsp</td>--><td>Total </td><td align="right">Rp. ' . number_format($ttlremaining_balance) . '</td>
                <!--<td></td><td></td>--> <td align="right">Rp. ' . number_format($ttldenda_terlambatb) . '</td><td align="right">Rp. ' . number_format($ttlremaining_balance + $ttldenda_terlambatb) . '</td></tr>';

        return $table;
    }

    public function getHTMLdefault()
    {
        return $this->getHTML();
    }

    public function getHTML($spke = null, $data)
    {
        $word = "";
        if ($data['is_printpreview'] == 1) {
            $namafile = trim($data['cluster'] . '_' . $data['unit_number']) . '_' . date('d-m-Y');
            $word = "
                <script>
                    function Export2Doc(element, filename = ''){
                        var preHtml = \"<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>\";
                        var postHtml = \"</body></html>\";
                        var html = preHtml+document.getElementById(element).innerHTML+postHtml;
                        var blob = new Blob(['\ufeff', html], {
                            type: 'application/msword'
                        });
                        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
                        filename = filename?filename+'.doc':'document.doc';
                        var downloadLink = document.createElement('a');
                        document.body.appendChild(downloadLink);
                        if(navigator.msSaveOrOpenBlob ){
                            navigator.msSaveOrOpenBlob(blob, filename);
                        }else{
                            downloadLink.href = url;
                            downloadLink.download = filename;
                            downloadLink.click();
                        }                        
                        document.body.removeChild(downloadLink);
                    }
                </script>
                <button onclick=\"Export2Doc('exportContent', '$namafile');\">Export as .doc</button>";
        }
        $tgl_print = $this->tgl_indo(date('Y-m-d', strtotime("0 day"))); //default 0 day
        $total_tunggakan = $data["total_tunggakan"];
        $nomor_sp_teratas = $data["nomor_sp_teratas"];
        $a = explode('/', $nomor_sp_teratas);
        $b = (int)($a[0]);
        if (substr($b, 0, 1) == "0") {
            if ($data['pt_id'] == 25) {
                $nomor_sp_teratas = str_replace("CWR", "CPG", $data["nomor_terakhir"]);
            } else if ($data['pt_id'] == 26) {
                $nomor_sp_teratas = str_replace("CWR", "CDLR", $data["nomor_terakhir"]);
            } else if ($data['pt_id'] == 24) {
                $nomor_sp_teratas = str_replace("CWR", "LAB", $data["nomor_terakhir"]);
            } else if ($data['pt_id'] == 22415) {
                $nomor_sp_teratas = str_replace("CWR", "CD", $data["nomor_terakhir"]);
            } else {
                $nomor_sp_teratas = $data["nomor_terakhir"];
            }
        }
        $tpl1 =
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
                <br/>
                <br/>
                <br/>
                <br/>
                <p class="spstyle_p">Makassar, ' . $tgl_print . '</p>
                <p class="spstyle_p">No : ' . $nomor_sp_teratas . '<br/>
                    Hal : Surat  Pemberitahuan Tunggakan <b>{{sp_ke_romawi}} ({{sp_surat_ke_new}}) </b> </p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    <b>Bapak/Ibu {{customer_name}}<br>
                    {{customer_address}}</b></p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';

        $tpl2 =
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
                <br/>
                <br/>
                <br/>
                <br/>
                <p class="spstyle_p">Makassar, ' . $tgl_print . '</p>
                <p class="spstyle_p">No : ' . $nomor_sp_teratas . '<br/>
                    Hal : Surat  Pemberitahuan Tunggakan <b>{{sp_ke_romawi}} ({{sp_surat_ke_new}}) </b> - <b><i> Dateline</b></i></p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    <b>Bapak/Ibu {{customer_name}}<br>
                    {{customer_address}}</b></p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';

        $tpl3 =
            'Berdasarkan Surat Pemesanan Tanah dan Bangunan (<b>SPT</b>) Nomor : <b>{{purchaseletter_no}}</b> dan Surat Pengikatan Perjanjian Jual Beli (<b>PPJB</b>) Nomor <b>{{sppjb_no}}</b> tanggal {{sppjb_date}}, bersama ini kami memberitahukan perhitungan tunggakan angsuran serta denda atas keterlambatan pembayaran kaveling blok <b>{{unit_number}}</b> Kawasan <b>{{cluster}}</b> di CitraLand Tallasa City Makassar.<br/>
            Terhitung sampai dengan tanggal <b>'.$tgl_print.'</b> Januari 2021, sbb:<br/>
                        </p>        
                        ';

        $tpl4 =
            'Menindaklanjuti <b>Surat Peringatan 2</b> kami tanggal {{tgl_sp2}} No.{{sp2}}, bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>Blok {{block_code}} No. {{unit_no}} {{cluster}}</b>,bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>' . $tgl_print . '</b> belum melaksanakan pembayaran yang telah jatuh tempo. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :</p>        ';

        $tpl5 = 'Sehubungan dengan tidak adanya kelanjutan pembayaran atas transaksi pembelian Rumah di CitraLand Tallasa City Makassar di kawasan <b>{{cluster}}</b> blok <b>{{unit_number}}</b> sebagaimana tertulis dalam Surat Pemesanan Tanah dan Bangunan (<b>SPT</b>) Nomor : <b>{{purchaseletter_no}}</b> dan Surat Pengikatan Perjanjian Jual Beli (<b>PPJB</b>) Nomor <b>{{sppjb_no}}</b> tanggal <b>{{sppjb_date}}</b>, dengan sangat menyesal kami harus <b>membatalkan secara sepihak</b> transaksi pembelian rumah tersebut sehingga kami dapat menjualnya kepada pihak lain.

            Adapun dari jumlah uang terbayar akan dikembalikan sebagian setelah dilakukan pemotongan sebagaimana tertera dalam SPT, dengan perincian sbb :<br/>
                    ';

        $tpl6 = '
            <table width=100%>
                <tbody align="center">
                <tr style="background-color: #e8e9ea;font-weight: bold;">
                <!--<td>Tagihan</td>
                    <td>Termin</td>-->
                    <td>Tunggakan Bulan</td>
                    <td>Cicilan Pokok</td>
                    <!--<td>Keterlambatan (hari) </td>
                    <td>Nomor SP - Tanggal SP</td>-->
                    <td>Denda Keterlambatan</td>
                    <td>Total Dibayar</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table>
                
            {{{pageBreak3}}}   
            <b>Total tagihan sebesar Rp ' . number_format($total_tunggakan) . ',- ({{total_tunggakan_text}} Rupiah).</b><br/>
            Mohon pembayaran ditransfer ke rekening kami :
                        <br/> 

            <p class="spstyle_p" align="center">
            <b>Bank Mandiri Cab Makassar Kartini, Makassar<br/>
            No. Rekening  1520025588886 atas nama Ciputra Tallasa Joint Operation<br/>
            atau ke Marketing Gallery CitraLand Tallasa City Makassar<br/></b>

            <!--Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:    
                        </p>
                <p>
                a.&nbsp;&nbsp;Transfer ke : {{pt_name }} {{nomor_acc_bca}} <b>BCA kalideres Jakarta  Barat.</b> Mohon  mencantumkan Unit dan nama pemesan pada  kolom  berita  di slip transfer ( bukti transfer mohon difax ke 6198213 Up. Collection dan segera  ditukar  dengan  kwitansi  CitraGarden City) , atau <br>
                b.&nbsp;&nbsp;Membayar langsung ke kasir penerimaan City Management Office, Citra 2 Ext, Blok BG. 2A No. 01, Citra Garden City, Jakarta Barat dengan cash, giro / cek jatuh tempo atau debit BCA.-->
                </p><br/>
                            ';

        $tpl7 = '
            <table width=100%>
                <tbody align="center">
                <tr style="background-color: #e8e9ea;font-weight: bold;">
                <!--<td>Tagihan</td>
                    <td>Termin</td>-->
                    <td>Tunggakan Bulan</td>
                    <td>Cicilan Pokok</td>
                    <!--<td>Keterlambatan (hari) </td>
                    <td>Nomor SP - Tanggal SP</td>-->
                    <td>Denda Keterlambatan <br>( s/d {{max_date_w}} )</td>
                    <td>Total Dibayar <br>( s/d {{max_date_w}} )</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table>
                
            {{{pageBreak3}}}   
            Untuk informasi lebih lanjut dapat menghubungi Collection CitraLand Tallasa City di nomor telp 0411-4731 888 / WA (08114612618).<br/>
            Atas perhatian dan kerjasamanya kami ucapkan terima kasih.<br/>
            ';

        $tpl8 = 'Untuk informasi dan konfirmasi pembayaran dapat menghubungi collection CitraLand Tallasa City Makassar di nomor telp 0411-4731888 / WA (08114612618). <b>Bila pembayaran telah dilaksanakan sebelum menerima surat ini, maka kami mohon agar surat ini diabaikan.</b><br/>

                Atas perhatian dan kerjasamanya kami ucapkan terima kasih.<br/>
                ';

        $tpl9 = '<style>
                
                
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
                <br/>
                <br/>
                <br/>
                <br/>
                <p class="spstyle_p">Makassar, ' . $tgl_print . '</p>
                <p class="spstyle_p">No : ' . $nomor_sp_teratas . '<br/>
                    Hal : <b> Informasi Pembatalan Sepihak </b> </p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    <b>Bapak/Ibu {{customer_name}}<br>
                    {{customer_address}}</b></p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';

        $tpl10 = 'Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Apabila sampai dengan tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu membatalkan pemesanan unit tersebut. <b>Keseluruhan uang</b> yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan.</b> Dengan demikian kami <b>berhak</b> menjual kembali unit tersebut kepada pihak lain.
            <br>
            Untuk tindak lanjut penyelesaian dapat menghubungi petugas Collection kami, di no. telp. <b>6198177 ext. 712/710 Ervinna/Mega.</b>
                                
                    <br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';

        $tpl11 = '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
                <!--<b> {{pt_name }} </b></br>-->
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>Rendy Weol</b></u><br/>
                <!-- --------------------------------------<br/> -->
                Finance Controller<br/>
                <!--{{salesman_name}} (Sales)<br/>-->
                </p>
                Tembusan :<br/>
                1.  Aloysius Pangky Wijaya (Head Office Departement Marketing & Sales)<br/>
                2.  ........................................ (Sales)<br/>
                <p class="spstyle_p_small">*<i>Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</i></p>
                </body>
                ';
        $tpl12 .= '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
                <b>{{pt_name }}</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>Edwin Hari Wardhana</b></u><br/>
                <!-- --------------------------------------<br/> -->
                General Manager
                <!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak / Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>
                </body>
                ';

        if ($spke == 1) {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl8 . $tpl11;
        } elseif ($spke == 2) {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl8 . $tpl11;
        } elseif ($spke == 3) {
            $tpl = $tpl2 . $tpl3 . $tpl6 . $tpl8 . $tpl11;
        } elseif ($spke == 4) {
            $tpl = $tpl9 . $tpl5 . $tpl7 . $tpl11;
        } else {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl7 . $tpl11;
        }

        return $word . '<div id="exportContent">' . $tpl . '</div>';
    }
}
