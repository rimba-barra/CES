<?php

/**
 * Description of Default
 *
 * @author David-MIS
 */
class Erems_Models_Suratperingatan_CitraGrandCBDCibubur {

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
                $denda = $row["remaining_denda"];
            } else {
                $denda = $row["denda_terlambatb"];
            }
            $ttldenda_terlambatb = $ttldenda_terlambatb + $denda;
            $ttlremaining_balance = $ttlremaining_balance + $row["remaining_balance"];
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
                <p class="spstyle_p">Jakarta,' . $tgl_print . '</p><br/>
                <p class="spstyle_p">No	: ' . $nomor_sp_teratas . '<br/>
                    Hal	: <b>Surat Pemberitahuan ke-{{sp_surat_ke}}</b> </p><br/>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    <b>Bapak/Ibu {{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';

        $tpl2 =
            'Menindaklanjuti Surat Pemberitahuan 1 kami No.{{sp1}} tertanggal <b>{{tgl_sp1}}</b>, berdasarkan catatan kami bahwa Bapak/Ibu sampai dengan tanggal <b>' . $tgl_print . '</b> belum melaksanakan pembayaran angsuran <b>Type {{type_name}} Blok {{unit_number}} Kaw. {{cluster}} ( {{cluster_code}} )</b>. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :</p>        
                        <br/>';

        $tpl3 =
            'Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami dengan pemesanan rumah/kavling di blok <b>{{unit_number}}</b> di CitraGrand Cibubur CBD.<br/><br/>
            Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, melalui surat ini kami ingin memberitahukan tentang pembayaran <b>Angsuran 6/12</b>  yang sudah jatuh tempo yang hingga saat ini kami belum menerima pembayarannya, sehingga total yang harus Bapak/Ibu bayar adalah sebesar <b>Rp. ' . number_format($data['total_remaining']) . ',- (sudah termasuk denda)</b> Adapun rincian terlampir.<br/><br/>
            Kami mohon Bapak/Ibu dapat melunasi pembayaran tersebut paling lambat tanggal <b>{{max_date_w}}</b>.<br/><br/>
                        </p>        
                        ';

        $tpl4 =
            'Menindaklanjuti <b>Surat Pemberitahuan 2</b> kami <b>No.{{sp2}}</b> tertanggal <b>{{tgl_sp2}}</b> , berdasarkan catatan kami bahwa Bapak/Ibu sampai dengan tanggal <b>' . $tgl_print . '</b> masih belum melaksanakan pembayaran angsuran <b>Type {{type_name}} Blok {{unit_number}} Kaw. {{cluster}} ( {{cluster_code}} )</b>. Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah) :</p>        ';

        $tpl5 = 'Sesuai dengan Informasi pesan singkat (via WA) tertanggal ' . $tgl_print . ' yang kami <b>( Lusi Collection )</b> terima dari Sales Marketing 
            <b>Sulaiman Wibifono</b>, bahwa Bapak/Ibu mengundurkan diri dari pembelian tanah dan bangunan <b>Type {{type_name}} Blok {{unit_number}} Kaw. {{cluster}} ( {{cluster_code}} )</b>.
			<br/><br/>
			Keseluruhan uang yang telah Bapak /Ibu bayarkan <b>tidak dapat dikembalikan</b>. Dengan demikian kami <b>berhak menjual</b> kembali tanah dan bangunan tersebut kepada pihak lain.<br/>
			<br/>
            Untuk keterangan lebih jelas bisa menghubungi petugas Collection kami, <b>sdri Yanti / Ferawati</b> di pesawat <b>0541 7283388 - 7283488<b/>.<br/>
            <br/>
			<br/>
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
					<td>Denda Keterlambatan <br>( s/d {{max_date_w}} )</td>
					<td>Total Dibayar <br>( s/d {{max_date_w}} )</td>
                </tr> 
                {{{list_tagihan}}}
                </tbody></table>
				
			{{{pageBreak3}}}   
			Denda keterlambatan diatas akan berubah sampai dengan pembayaran
                        <br/> <p class="spstyle_p">
			Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran paling lambat tanggal <b>{{max_date_w}}</b> dengan cara:	
                        </p>
				<p>
				• &nbsp;&nbsp;<b>Transfer melalui No Rekening MANDIRI 148.00.99626999 a/n  CITRA SUKSES JO</b><br/>
                • &nbsp;&nbsp;<b>Transfer melalui No VA MANDIRI {{va_mandiri}} a/n Bapak/Ibu {{customer_name}}</b><br/>
				• &nbsp;&nbsp;Membayar langsung ke kasir penerimaan di kantor pemasaran CitraLand City Samarinda, dengan giro/cek jatuh tempo ( tidak menerima pembayaran tunai di Kasir)
				</p><br/><br/>
            Kelalaian dan/ atau keterlambatan kewajiban pembayaran diatas akan mempengaruhi waktu janji serah terima Unit tersebut. Kepastian waktu serah terima Unit akan kami informasikan lebih lanjut setelah dilakukannya kewajiban pembayaran diatas.<br/>
							';

        $tpl7 = 'Adapun pembayarannya dapat langsung ditransfer ke rekening :<br/><br/>
                PT. Ciputra Nugraha Internasional, Bank Mandiri Cab. Jakarta Berdharma, A/c No. 122-000-777-0632<br/>
                atau rekening :<br/>
                PT. Ciputra Nugraha Internasional, Bank BCA Cab.CitraGran Cibubur, A/c No.  711-5555-006<br/><br/>
                            ';

        $tpl8 = 'Apabila Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat diemail ke tyamarunduri@ciputra.com dan pemberitahuan ini dapat diabaikan.<br/><br/>
                Atas perhatian dan kerjasama bapak/Ibu , kami ucapkan terima kasih.<br/><br/>';

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
                <p class="spstyle_p">Bogor, <b>' . $tgl_print . '</b></p>
                <p class="spstyle_p">No	: ' . $nomor_sp_teratas . '<br/>
                    Hal	: <b>Surat Pemberitahuan Pembatalan</b></p> <br/>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p><br/>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';

        $tpl10 = 'Apabila lewat dari tanggal tersebut diatas maka dengan sangat menyesal kami menganggap Bapak/Ibu membatalkan pemesanan tanah dan bangunan tersebut serta uang yang telah dibayarkan tidak dapat dikembalikan.
		<br/>
		<br/>
		';

        $tpl11 = '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b> {{pt_name }} </b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>Haryanto</u></b><br/>
				<!-- --------------------------------------<br/> -->
				Financial Controller<br/><br/>
                <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" align="left">CC : </td>
                        <td align="justify" style="border:none;">Michele Apricia</td>
                        <td align="justify" style="border:none;">&nbsp;(Sales Coordinator)</td>
                    </tr>
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" align="left"></td>
                        <td align="justify" style="border:none;">Alfredo Amarbuga</td>
                        <td align="justify" style="border:none;">&nbsp;(Sales)</td>
                    </tr>
                           </table>
                <!--Cc : Michell&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Sales Coordinator)<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alfredo Amarbuga&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Sales)
				{{salesman_name}} (Sales)<br/>-->
                </p>

                <!--<p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima ternyata Bapak/Ibu telah melakukan penyetoran ke rekening kami, mohon untuk diabaikan surat kami atau konfirmasi ke petugas collection kami <b>Yanti / Ferawati</b>., sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>-->
                </body>
                ';
        $tpl12 .= '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b>{{pt_name}}</b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>HARI SUKRIYADI</b></u><br/>
				<!-- --------------------------------------<br/> -->
				General Manager
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <!--<p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima ternyata Bapak/Ibu telah melakukan penyetoran ke rekening kami, mohon untuk diabaikan surat kami atau mengirimkan buktitransfer/setoran via fax no.29660928 Up. Dwi., sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>-->
                </body>
                ';

        if ($spke == 1) {
            $tpl = $tpl1 . $tpl3 . $tpl7 . $tpl8 . $tpl11;
        } elseif ($spke == 2) {
            $tpl = $tpl1 . $tpl2 . $tpl6 . $tpl8 . $tpl11;
        } elseif ($spke == 3) {
            $tpl = $tpl1 . $tpl4 . $tpl6 . $tpl10 . $tpl8 . $tpl11;
        } elseif ($spke == 4) {
            $tpl = $tpl9 . $tpl5 . $tpl11;
        } else {
            $tpl = $tpl1 . $tpl3 . $tpl6 . $tpl7 . $tpl11;
        }

        return $tpl;
    }
}
