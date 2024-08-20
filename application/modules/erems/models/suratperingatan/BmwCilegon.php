<?php

/**
 * Description of Default
 *
 * @author David-MIS
 */
class Erems_Models_Suratperingatan_BmwCilegon
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
            // var_dump($row);
            // if($row['indicatorname'] == 'denda'){
            $denda = round($row["remaining_denda"]);
            // }else{
            // $denda = $row["denda_terlambatb"];
            // }
            $ttldenda_terlambatb = $ttldenda_terlambatb + $denda;
            $ttlremaining_balance = $ttlremaining_balance + $row["remaining_balance"];
            $table .= '<tr>
                        <td>' . $row["scheduletype"] . '</td>
                        <td>' . $row["termin"] . '</td>
                        <td>' . date('d-m-Y', strtotime($row["duedate"])) . '</td>
                        <td align=right>Rp. ' . number_format($row["remaining_balance"]) . '</td>
                        <!--<td>' . $row["hari_terlambatb"] . '</td><td>' . $row["sp_no"] . '</td>--> 
                        <td align=right>Rp. ' . number_format($denda) . '</td>
                        <td align=right>Rp. ' . number_format($row["remaining_balance"] + $denda) . '</td>
                    </tr>';
        }

        $table .= '<tr><td>&nbsp</td><td>&nbsp</td><td><b>Total</b></td><td align=right><b>Rp. ' . number_format($ttlremaining_balance) . '</b></td>
                <!--<td></td><td></td>--> <td width="150px" align=right><b>Rp. ' . number_format($ttldenda_terlambatb) . '</b></td><td width="150px" align=right><b>Rp. ' . number_format($ttlremaining_balance + $ttldenda_terlambatb) . '</b></td></tr>';

        return $table;
    }

    public function getHTMLdefault()
    {
        return $this->getHTML();
    }

    public function getHTML($spke = null, $data)
    {
        if ($spke == 1) {
            $sp_ke_before = $spke;
            $no_sp_before = $data['sp1'];
            $no_sp = $data['sp1'];
            $tgl_sp_before = $data['sp1_date'];
            $sp1_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp1_date'])));
        } elseif ($spke == 2) {
            $sp_ke_before = $spke - 1;
            $no_sp_before = $data['sp1'];
            $no_sp = $data['sp2'];
            $tgl_sp_before = $data['sp1_date'];
            $sp2_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp2_date'])));
        } elseif ($spke == 3) {
            $sp_ke_before = $spke - 1;
            $no_sp_before = $data['sp2'];
            $no_sp = $data['sp3'];
            $tgl_sp_before = $data['sp2_date'];
            $sp3_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp3_date'])));
        } else {
            $sp_ke_before = $spke - 1;
            $no_sp_before = $data['sp3'];
            $no_sp = $data['sp4'];
            $tgl_sp_before = $data['sp3_date'];
            $sp4_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp4_date'])));
        }

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

        //$this->tgl_indo(date('Y-m-d',strtotime($row["duedate"])))
        $tgl_print = $this->tgl_indo(date('Y-m-d', strtotime("0 day"))); //default 0 day

        $nomor_sp_teratas = $data["nomor_sp_teratas"];
        $a = explode('/', $nomor_sp_teratas);
        $b = (int)($a[0]);
        if (substr($b, 0, 1) == "0") {
            $nomor_sp_teratas = $data["nomor_terakhir"];
        }

        if ($data['total_schedule'] > 5) {
            //$page_break = "<div style='page-break-before:always;'><br/><br/><br/><br/><br/></div>";
            $page_break = "";
        } else {
            $page_break = "";
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
                <!--<p class="spstyle_p" align="right">Jakarta, <b>' . $tgl_print . '</b></p>-->
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
				<p class="spstyle_p">Jakarta, <b>' . $tgl_print . '</b><br/>
                <p class="spstyle_p">No. Ref : <b>' . $nomor_sp_teratas . '</b><br/>
                    Hal : Peringatan ke <b>{{max_sp}}</b></p>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
					' . $data['customer_address2'] . '
				</p>
				<!--<br/>-->
                <!--<br>-->

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';

        $tpl11 =
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
                <!--<p class="spstyle_p" align="right">Jakarta, <b>' . $tgl_print . '</b></p>-->
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
				<p class="spstyle_p">Jakarta, <b>' . $tgl_print . '</b><br/>
                <p class="spstyle_p">No. Ref : <b>' . $nomor_sp_teratas . '</b><br/>
                    Hal : <b> Surat Pembatalan</b></p>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>                    
					' . $data['customer_address2'] . '
					</p>
				<!--<br/>-->
                <!--<br>-->

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';

        $tpl2 =
            'Menindaklanjuti <b>Surat Peringatan {{sp_ke_before}}</b> kami tanggal {{tgl_sp1}} No. ' . $data['sp1'] . '. ';

        $tpl21 =
            'Menindaklanjuti <b>Surat Peringatan {{sp_ke_before}}</b> kami tanggal {{tgl_sp2}} No. ' . $data['sp2'] . '. ';

        $tpl22 =
            'Menindaklanjuti <b>Surat Peringatan {{sp_ke_before}}</b> kami tanggal {{tgl_sp3}} No. ' . $data['sp3'] . '. ';

        $tpl3 =
            'Bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit  <b> {{unit_number}} </b> {{cluster}}, bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>' . $tgl_print . '</b> belum melaksanakan pembayaran angsuran yang telah jatuh tempo, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah):
                </div>
                

                <table>
					<tbody>
						<tr style="background-color: #e8e9ea;font-weight: bold:height="60x";">
							<td>Tagihan</td>
							<td>Termin</td>
							<td width="150px">Tanggal Jatuh Tempo</td>
							<td width="150px">Nilai Tagihan</td>
							<!--<td>Keterlambatan (hari) </td><td>Nomor SP - Tanggal SP</td>-->
							<td width="150px">Denda Keterlambatan <br>( s/d {{max_date}} )*</td>
							<td width="150px">Total Dibayar <br>( s/d {{max_date}} )*</td>
						</tr> 
                {{{list_tagihan}}}
                </tbody></table>
                <div class="amiddle">
                Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tgl. terhutang.<br/>

                Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:<br/>
                <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">a.</td>
                        <td align="justify" style="border:none;">
                            Transfer melalui Virtual Account (Bukti transfer mohon difax ke (021) 6198213 Up. Henni/Eny atau WA ke 081381070944 /08128915293
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">b.</td>
                        <td align="justify" style="border:none;">
                            Bukti Transfer/Pembayaran dapat ditukar Kwitansi 2 Minggu dari Tanggal Transaksi ke kasir CitraGarden BMW, Ruko CITRA GATEWAY Blok B.02 No.1-2 Wanayasa, Kramatwatu, Serang Banten 42161. Up. FRIDA di no. Telp. 0254-8492999.
                        </td>

                    </tr>
                </table>
                Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami, sdri. <b>Henni/Eny</b> di no. telp. <b>(021) 6198177 ext. 711/727.</b>
                 <br/>

                 ';

        $tpl6 = ', kami tegaskan kepada Bapak/Ibu selaku pembeli ' . $data['productcategorytype'] . ' Blok <b>{{unit_number}}</b> kawasan {{cluster}}, bahwa pemesanan ' . $data['productcategorytype'] . ' tersebut menjadi batal.
                    <br/>
                    Keseluruhan uang yang telah Bapak/Ibu bayarkan  tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali ' . $data['productcategorytype'] . ' tersebut kepada pihak lain. 
                     
                    <br/>
					' . $page_break . '
                    Demikian hal ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.
                <br/><br/> ';

        $tpl4 =  '
                Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu membatalkan pemesanan ' . $data['productcategorytype'] . ' tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali ' . $data['productcategorytype'] . ' tersebut kepada pihak lain
                 <br/><br/>';

        $tpl5 .= '
			' . $page_break . ' 
			Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu  kami ucapkan terima kasih.
                </div>
                <!--<br/><br/>-->
                <p class="spstyle_p">
                Hormat Kami,</br>
                <b>CITRA PRADIPTA KSO</b>
                <br/>
				<br/>
                <br/>
				<br/>
                <b>OVIANA</b><br/>
                Finance Departement Head
                </p>

                <p class="spstyle_p_small">*Note : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</p>
                </body>
                ';

        $tpl7 .= '
			' . $page_break . ' 
			
                </div>
                <!--<br/><br/>-->
                <p class="spstyle_p">
                Hormat Kami,</br>
                <b>CITRA PRADIPTA KSO</b>
                <br/>
				<br/>
                <br/>
				<br/>
                <b>ARDY SURYA PRANOTO</b><br/>
                Kuasa Direksi
                </p>

                <p class="spstyle_p_small">*Note : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</p>
                </body>
                ';
				
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
			
			kami informasikan bahwa sampai dengan tanggal ' . $tgl_print . ', kami belum menerima pembayaran atas angsuran yang telah jatuh tempo. Oleh karena itu, melalui ini kami sampaikan kepada Bapak/Ibu selaku pembeli unit <b>{{unit_number}} {{cluster}}</b> CitraGarden BMW Cilegon, bahwa pembelian unit tersebut menjadi <b>batal</b>.
			</p>			
			<p style="font-family: Arial Narrow;font-size: 11pt; font-style: normal; text-align: justify;">
			
			Keseluruhan uang yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan</b>. Dengan demikian kami <b>berhak menjual</b> kembali unit rumah tersebut kepada pihak lain.
			</p>
			<p style="font-family: Arial Narrow;font-size: 11pt; font-style: normal; text-align: justify;">
			
			Demikian hal ini kami sampaikan. Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.</p><br>';
		
        if ($spke == 1) {
            $tpl = $tpl1 . $tpl3 . $tpl5;
        } elseif ($spke == 2) {
            $tpl = $tpl1 . $tpl2 . $tpl3 . $tpl5;
        } elseif ($spke == 3) {
            $tpl = $tpl1 . $tpl21 . $tpl3 . $tpl4 . $tpl5;
        } elseif ($spke == 4) {
            //$tpl = $tpl11 . $tpl22 . $tpl6 . $tpl7;
			$tpl = $tpl91 . $tpl101 . $tpl7;
        } else {
            $tpl = $tpl1 . $tpl3 . $tpl5;
        }

        return $word . '<div id="exportContent">' . $tpl . '</div>';
    }
}
