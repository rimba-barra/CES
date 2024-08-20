<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitralandMegahBatam
{

    function tgl_indo($tanggal)
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
                $denda = $row["remaining_denda"];
            } else {
                $denda = $row["denda_terlambatb"];
            }
            $ttldenda_terlambatb = $ttldenda_terlambatb + round($denda);
            $ttlremaining_balance = $ttlremaining_balance + $row["remaining_balance"] ;
            $table .= '<tr>
                        <!--<td>' . $row["scheduletype"] . '</td>
                        <td>' . $row["termin"] . '</td>-->
                        <td>' . $this->tgl_indo(date('Y-m-d', strtotime($row["duedate"]))) . '</td>
                        <td align="right">Rp. ' . number_format($row["remaining_balance"]) . '</td>
                        <!--<td>' . $row["hari_terlambatb"] . '</td><td>' . $row["sp_no"] . '</td>--> 
                        <td align="right">Rp. ' . number_format($denda) . '</td>
                        <td align="right">Rp. ' . number_format($row["remaining_balance"] + round($denda)) . '</td>
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
        $tgl_print = $this->tgl_indo(date('Y-m-d', strtotime("0 day"))); //default 0 day
        $nomor_sp_teratas = $data["nomor_sp_teratas"];
        $a = explode('/', $nomor_sp_teratas);
        $b = (int)($a[0]);
        if (substr($b, 0, 1) == "0") {
            $nomor_sp_teratas = $data["nomor_terakhir"];
        }
        // var_dump($data);
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
				<br/>
                <br/>
                <br/>
                <p class="spstyle_p">Jakarta, <b>' . $tgl_print . '</b></p>
                <p class="spstyle_p">No. Ref : <b>' . $nomor_sp_teratas . '</b><br/>
                    Hal : <b><u>Peringatan ke {{sp_surat_ke}}</b></u> </p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    Bapak/Ibu <b>{{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';

        $tpl2 =
            'Menindaklanjuti <b>Surat Peringatan 1</b> kami tanggal {{tgl_sp1}} No.{{sp1}}. Bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}}</b> , <b>cluster {{cluster}}</b>, bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>' . $tgl_print . '</b> belum melaksanakan pembayaran angsuran yang telah jatuh tempo, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :</p>        
                        ';

        $tpl3 =
            'Bersama surat ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}} - cluster {{cluster}}</b>, bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>' . $tgl_print . '</b> belum melaksanakan pembayaran angsuran yang telah jatuh tempo. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :
                        </p>        
                        ';

        $tpl4 =
            'Menindaklanjuti <b>Surat Peringatan 2</b> kami tanggal {{tgl_sp2}} No.{{sp2}}, bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}}</b> , cluster {{cluster}},bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>' . $tgl_print . '</b> belum melaksanakan pembayaran yang telah jatuh tempo, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :</p>';

        $tpl5 = 'Menindaklanjuti pembicaraan melalui whatsapp, , tertanggal ' . $tgl_print . ', yang mengkonfirmasi pembatalan  atas pembelian rumah <b>di {{unit_number}}</b> , cluster {{cluster}},Citra Land Megah Batam, Bersama ini kami tegaskan kepada Bapak/Ibu selaku pembeli rumah bahwa pemesanan rumah tersebut menjadi <b>batal.</b>
			<br/><br/>
			Keseluruhan <b>uang tanda jadi</b> yang telah Bapak /Ibu bayarkan <b>tidak dapat  dikembalikan.</b> Dengan demikian kami <b>berhak menjual</b> kembali unit tersebut kepada pihak lain.
			<br>
			<br>
			Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.';

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
					<td>Denda Keterlambatan <br>( s/d {{max_date}} )</td>
					<td>Total Dibayar <br>( s/d {{max_date}} )</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table>
                <br/>
				
			{{{pageBreak3}}}   
			<b>Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tgl. terhutang.</b>
                        <br/> <p class="spstyle_p">
			Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:	
                        </p>
				<p>
				&nbsp;&nbsp;&nbsp;a. Transfer melalui Virtual Account (Bukti transfer mohon difax ke (021) 6198213 Up. Henni/Eny atau WA ke 081381070944 /08128915293<br/>
				&nbsp;&nbsp;&nbsp;b. Bukti Transfer/Pembayaran dapat ditukar Kwitansi 2 Minggu dari Tanggal Transaksi ke kasir Citra Land Megah Batam, Bundaran 2 Citraland Megah, Belian- Batam Kota . Up. Sella di no. Telp. (0778) 4160999. <br> 
				</p>
							';

        $tpl7 = 'Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami, sdri. <b>Henni/Eny</b> di no. telp. <b>(021) 6198177 ext. 711/727.</b>
					<br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';

        $tpl8 = 'Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami, sdri. <b>Henni/Eny</b> di no. telp. <b>(021) 6198177 ext. 711/727.</b>
					<br/><br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';

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
				<br/>
                <br/>
                <br/>
                <p class="spstyle_p">Jakarta, <b>' . $tgl_print . '</b></p>
                <p class="spstyle_p">No	: <b>' . $nomor_sp_teratas . '</b><br/>
                    Hal	: <b>Surat  Pembatalan</b></p> <br/>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p><br/>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';

        $tpl10 = 'Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami, sdri. <b>Henni/Eny</b> di no. telp. <b>(021) 6198177 ext. 711/727.</b>
			<br>
			<br>
			Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu membatalkan pemesanan Rumah tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali Rumah tersebut kepada pihak lain.
					
					<br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';

        $tpl11 = '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>CITRA ARTHAMEGAH JO</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>OVIANA</u></b><br/>
				<!-- --------------------------------------<br/> -->
				Finance Department Head 
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <p class="spstyle_p_small"><b>*Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>
                </body>
                ';
        $tpl12 .= '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>CITRA ARTHAMEGAH JO</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>NARARYA CIPUTRA SASTRAWINATA</u></b><br/>
				<!-- --------------------------------------<br/> -->
				Kuasa Direksi 
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                 <p class="spstyle_p_small"><b>*Note</b> : <i>Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>
                </body>
                ';
				
		$tpl13 = 'Menindaklanjuti <b>Surat Pemberitahuan 3</b> kami tanggal {{tgl_sp3}} No.{{sp3}}, kami tegaskan kepada Bapak/Ibu selaku pembeli Rumah Blok <b>{{unit_number}}</b> , kawasan {{cluster}},bahwa pemesanan Rumah tersebut menjadi <b>batal.</b>
			<br/><br/>
			Keseluruhan <b>uang</b> yang telah Bapak /Ibu bayarkan <b>tidak dapat  dikembalikan.</b> Dengan demikian kami <b>berhak menjual</b> kembali Rumah tersebut kepada pihak lain.
			<br>
			<br>
			Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.';
			
		$tpl91 = '<style>
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
                    font-family: "Arial Narrow", "Arial Narrow", cursive;
                }
                p.spstyle_p, div {
                    text-align: justify;
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    text-align: justify;
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
				<br/>
                <br/>
                <br/>
                <p class="spstyle_p"  ' . $style . '>Jakarta, ' . $tgl_print . '</p>
                <p class="spstyle_p" ' . $style . '>No. Ref &nbsp;&nbsp;&nbsp;&nbsp;: ' . $nomor_sp_teratas . '<br/>
                    Hal &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b><u>Surat  Pembatalan</b></u> </p> 

                <p class="spstyle_p" ' . $style . '>Kepada Yth, <br/>
                    <b>Bapak/Ibu {{customer_name}}</b><br/>
                    {{customer_address}}</p>

                <p class="spstyle_p" ' . $style . '>Dengan Hormat,<br/>
                <div class="amiddle" ' . $style . '>';
				
		$tpl101 = '<p style="font-family: Arial Narrow;font-size: 11pt; font-style: normal; text-align: justify;">Menindaklanjuti <b>Surat Peringatan 3</b> kami tanggal ' . $data['sp3_date'] . ' No.' . $data['sp3'] . ', 
			
			kami informasikan bahwa sampai dengan tanggal ' . $tgl_print . ', kami belum menerima pembayaran atas angsuran yang telah jatuh tempo. Oleh karena itu, melalui ini kami sampaikan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}} {{cluster}}</b> CitraLand Megah Batam, bahwa pembelian unit tersebut menjadi <b>batal</b>.
			</p>			
			<p style="font-family: Arial Narrow;font-size: 11pt; font-style: normal; text-align: justify;">
			
			Keseluruhan uang yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan</b>. Dengan demikian kami <b>berhak menjual</b> kembali unit tersebut kepada pihak lain.
			</p>
			<p style="font-family: Arial Narrow;font-size: 11pt; font-style: normal; text-align: justify;">
			
			Demikian hal ini kami sampaikan. Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.</p><br>';

        if ($spke == 1) {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl8 . $tpl11;
        } elseif ($spke == 2) {
            $tpl = $tpl1 . $tpl2 . $tpl6 . $tpl8 . $tpl11;
        } elseif ($spke == 3) {
            $tpl = $tpl1 . $tpl4 . $tpl6 . $tpl10 . $tpl11;
        } elseif ($spke == 4) {
            //$tpl = $tpl9 . $tpl13 . $tpl12;
			$tpl = $tpl91 . $tpl101 . $tpl12;
        } else {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl7 . $tpl11;
        }

        return $word . '<div id="exportContent">' . $tpl . '</div>';
    }
}
