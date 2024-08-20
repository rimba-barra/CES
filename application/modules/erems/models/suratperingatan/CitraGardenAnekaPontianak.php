<?php

/**
 * Description of Default
 *
 * @author David-MIS
 */
class Erems_Models_Suratperingatan_CitraGardenAnekaPontianak
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

        $table .= '<tr><td>&nbsp</td><td>&nbsp</td><td>Total </td><td align=right>Rp. ' . number_format($ttlremaining_balance) . '</td>
                <!--<td></td><td></td>--> <td width="150px" align=right>Rp. ' . number_format($ttldenda_terlambatb) . '</td><td width="150px" align=right>Rp. ' . number_format($ttlremaining_balance + $ttldenda_terlambatb) . '</td></tr>';

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

        $tgl_print = $this->tgl_indo(date('Y-m-d', strtotime("0 day"))); //default 0 day
        $sp1_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp1_date'])));
        $sp2_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp2_date'])));
        $sp3_date = $this->tgl_indo(date('Y-m-d', strtotime($data['sp3_date'])));
        $nomor_sp_teratas = $data["nomor_sp_teratas"];
        $ket_sp = $data["max_sp"];
        $a = explode('/', $nomor_sp_teratas);
        $b = (int)($a[0]);
        if (substr($b, 0, 1) == "0") {
            $nomor_sp_teratas = $data["nomor_terakhir"];
        }
        if ($spke == 4) {
        		$ket_sp = "<b> SP Batal </b>";}
        else
        	{
        		$ket_sp = "Peringatan ke <b>{{max_sp}}</b>";
        	}
        if ($spke == 4) {
        		$ttd = "<b>Jusanto Harijatno</b>";}
        else
        	{
        		$ttd = "<b>OVIANA</b>";
        	}
        if ($spke == 4) {
                $jbtn = "Kuasa Direksi";}
        else
            {
                $jbtn = "Finance Department Head";
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
                    font-size: 14px;
                }
                p.spstyle_p_small{
                    font-size: 12px;
                
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
				<br/>
				<br/>
				<p class="spstyle_p">Jakarta, <b>' . $tgl_print . '</b><br/>
                <p class="spstyle_p">No. Ref : <b>' . $nomor_sp_teratas . '</b><br/>
                    Hal : ' . $ket_sp . '</p>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>

                <!--<br>-->

                <p class="spstyle_p">Dengan Hormat,<!--<br/>-->
                <div class="amiddle">';

        $tpl2 =
            'Menindaklanjuti <b>Surat Peringatan {{sp_ke_before}}</b> kami tanggal ' . $sp1_date . ' No.' . $data['sp1'] . '. ';

        $tpl21 =
            'Menindaklanjuti <b>Surat Peringatan {{sp_ke_before}}</b> kami tanggal ' . $sp2_date . ' No.' . $data['sp2'] . '. ';

        $tpl22 =
           'Menindaklanjuti <b>Surat Peringatan {{sp_ke_before}}</b> kami tanggal ' . $sp3_date . ' No.' . $data['sp3'] . '';

        $tpl3 =
            'Bersama ini kami beritahukan kepada Bapak/Ibu selaku pembeli unit <b> {{unit_number}} </b> <b>{{cluster}}</b>, bahwa berdasarkan catatan kami, Bapak/Ibu sampai dengan tanggal <b>' . $tgl_print . '</b> belum melaksanakan pembayaran uang muka yang telah jatuh tempo, total tunggakan yang harus diselesaikan menjadi sebagai berikut (dalam rupiah):
                </div>
                <br/>

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
                <br/>
                <div class="amiddle">
                Denda keterlambatan diatas akan berubah sampai dengan pembayaran dan dihitung sejak tgl. terhutang.
                Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:<br/>
                <table style="border:none;">
                    <tr style="border:none;">
                        <td valign="top" style="border:none;" width="1" align="left">a.</td>
                        <td align="justify" style="border:none;">
                            Transfer melalui Virtual Account.</b> (bukti transfer mohon <b>di fax ke (021) 6198213 Up. Henni/Eny</b> atau <b>WA ke 0813810704944.</b>
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" style="border:none;" width="1" align="left">b.</td>
                        <td align="justify" style="border:none;">
                            b.	Bukti Transfer/Pembayaran dapat ditukar kwitansi 2 Minggu dari tanggal transaksi ke kasir CitraGarden Aneka, Marketing Office, Ruko Aerowalk Blok A00 No.1-3 Jl.Arteri Supadio Km.17.5 Kab.Kubu Raya 78391 Up. <b>Santy</b> di no.Telp. <b>0561-8100099</b>
                        </td>

                    </tr>
                </table>
                <br/>
                Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> Untuk penyelesaian pembayaran diatas. Untuk tindak lanjut penyelesaian dapat menghubungi petugas collection kami, sdri. <b>Henny/Eny</b> di no. telp. <b>021-6198177 ext. 711/727.</b>
                 <br/><br/>

                 ';

        $tpl6 = ', kami tegaskan kepada Bapak/Ibu selaku pembeli rumah Blok <b>{{unit_number}}</b> kawasan {{cluster}}, bahwa pemesanan rumah tersebut menjadi batal.
                    <br/>
                    Keseluruhan uang yang telah Bapak/Ibu bayarkan  tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali rumah tersebut kepada pihak lain. 
                     
                    <br/>

                <br/><br/> ';
		
		$tpl61 = ', kami tegaskan kepada Bapak/Ibu selaku pembeli rumah: <br></br>
					<br>Type: {{type_name}}</br> 
					Lokasi: Citra Garden Aneka, Blok {{unit_number}} Kubu Raya – Pontianak
					<br>SPPJB:{{sppjb_no}}</br>
					<br>bahwa pemesanan rumah dan SPPJB:{{sppjb_no}} tersebut menjadi batal, serta keseluruhan uang yang telah Bapak/Ibu bayarkan  tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali rumah tersebut kepada pihak lain. 
                     
                    <br/>

                <br/><br/> ';

        $tpl4 =  '
                Apabila lewat dari tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu membatalkan pemesanan rumah tersebut. Keseluruhan uang yang telah Bapak/Ibu bayarkan tidak dapat dikembalikan. Dengan demikian kami berhak menjual kembali rumah tersebut kepada pihak lain
                 <br/><br/>';

        $tpl5 .= 'Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu  kami ucapkan terima kasih.
                </div>
                <!--<br/><br/>-->
                <p class="spstyle_p">
                Hormat Kami,</br>
                <b>PT. CITRA MITRA PATAKA</b>
                <br/>
                <br/>
                <br/>
                <br/>
                '.$ttd.'<br/>
                '.$jbtn.'
                </p>

                <p class="spstyle_p_small">*Note : Apabila pada saat surat ini diterima Bapak/Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</p>
                </body>
                ';
        if ($spke == 1) {
            $tpl = $tpl1 . $tpl3 . $tpl5;
        } elseif ($spke == 2) {
            $tpl = $tpl1 . $tpl2 . $tpl3 . $tpl5;
        } elseif ($spke == 3) {
            $tpl = $tpl1 . $tpl21 . $tpl3 . $tpl4 . $tpl5;
        } elseif ($spke == 4) {
            $tpl = $tpl1 . $tpl22 . $tpl61 . $tpl5;
        } else {
            $tpl = $tpl1 . $tpl3 . $tpl5;
        }

        return $word . '<div id="exportContent">' . $tpl . '</div>';
    }
}
