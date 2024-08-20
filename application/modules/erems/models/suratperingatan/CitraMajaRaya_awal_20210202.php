<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitraMaja {
    
    public function getListTagihanHTML($params){
		function tgl_indo($tanggal){
	$bulan = array (
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
	
	// variabel pecahkan 0 = tanggal
	// variabel pecahkan 1 = bulan
	// variabel pecahkan 2 = tahun
 
	return $pecahkan[2] . ' ' . $bulan[ (int)$pecahkan[1] ] . ' ' . $pecahkan[0];
}
        $schedule = $params["schedule"][0];
        $total = 0.0;
        $ttldenda_terlambatb=0;
        $ttlremaining_balance=0;
        $table = "";

        foreach($schedule as $row){
            if($row['indicatorname'] == 'denda'){
                $denda = $row["remaining_denda"];
            }else{
                $denda = $row["denda_terlambatb"];
            }
            $ttldenda_terlambatb=$ttldenda_terlambatb+$denda;
            $ttlremaining_balance=$ttlremaining_balance+$row["remaining_balance"];
            $table .='<tr>
                        <!--<td>'.$row["scheduletype"].'</td>
                        <td>'.$row["termin"].'</td>-->
                        <td>'.tgl_indo(date('Y-m-d',strtotime($row["duedate"]))).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]).'</td>
                        <!--<td>'.$row["hari_terlambatb"].'</td><td>'.$row["sp_no"].'</td>--> 
                        <td align="right">Rp. '.number_format($denda).'</td>
                        <td align="right">Rp. '.number_format($row["remaining_balance"]+round($denda)).'</td>
                    </tr>';
        }

        $table .='<tr><!--<td>&nbsp</td><td>&nbsp</td>--><td>Total </td><td align="right">Rp. '.number_format($ttlremaining_balance).'</td>
                <!--<td></td><td></td>--> <td align="right">Rp. '.number_format($ttldenda_terlambatb).'</td><td align="right">Rp. '.number_format($ttlremaining_balance+$ttldenda_terlambatb).'</td></tr>';

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
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
                <p class="spstyle_p">Tangerang, {{tanggal_print_w}}</p><br/>
                <p class="spstyle_p">No	: {{nomor_sp_teratas}}<br/>
                    Hal	: Surat  Peringatan {{sp_surat_ke_new}} </p> 

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br>
                    <b>Bapak/Ibu {{customer_name}}</b><br>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br>
                <div class="amiddle">';
            
            $tpl2 = 
                'Menindaklanjuti Surat kami <b>No.{{sp1}} tertanggal {{tgl_sp1}},</b> berdasarkan catatan kami bahwa kepada Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> masih belum melaksanakan pembayaran angsuran <b> Type {{type_name}} Blok {{unit_number}} {{cluster}} ({{cluster_code}}).</b> Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sbb (dalam rupiah) :</p>        
                        <br/>';

            $tpl3 = 
                'Berdasarkan catatan kami bahwa Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> belum melakukan pembayaran angsuran <b> Type {{type_name}} Blok {{unit_number}} {{cluster}} ({{cluster_code}})</b> yang diakibatkan karena adanya denda berjalan. Atas hal tersebut, total yang harus diselesaikan menjadi sbb :
                        </p>        
                        ';
						
			$tpl4 = 
                'Menindaklanjuti Surat kami <b>No.{{sp2}} tertanggal {{tgl_sp2}},</b> berdasarkan catatan kami bahwa kepada Bapak/Ibu sampai dengan tanggal <b>{{tanggal_print_w}}</b> masih belum melaksanakan pembayaran angsuran <b> Type {{type_name}} Blok {{unit_number}} {{cluster}} ({{cluster_code}}).</b> Atas hal tersebut, total tunggakan yang harus diselesaikan menjadi sbb (dalam rupiah) :</p>        
                        <br/>';
			
			$tpl5 ='Menindaklanjuti surat kami <b>No.{{sp3}} tertanggal {{tgl_sp3}},</b> atas pemesanan type <b> Type {{type_name}} Blok {{unit_number}} {{cluster}} ({{cluster_code}}),</b> bahwa Bapak/Ibu sampai dengan saat ini belum juga melakukan pembayaran angsuran yang telah jatoh tempo</p>        
                        <br/>
						Mengingat ha tersebut maka dengan sangat menyesal kami membatalkan pembelian rumah tersebut. Uang masuk yang telah Bapak/Ibu bayarkan sebesar <b> Rp. {{total_payment}},- ( {{total_payment_text}}) tidak dapat di kembalikan (HANGUS)</b> sesuai yang tercantum pada Surat Pemesanan Rumah Pasal VII yang telah Bapak/Ibu Tandatangani tanggal {{tanda_tangan}}, serta kami berhak menjual kembali tanah dan bangunan tersebut. <br/>
						Demikian hal ini kami sampaikan. Atas perhatian dan kerjasama Bapak/Ibu kami mengucapkan terima kasih.';
			
			$tpl6 ='<br/>
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
                <br/>
				
			{{{pageBreak3}}}   
			Denda keterlambatan diatas akan berubah sampai dengan pembayaran.
                        <br/> <p class="spstyle_p">
			Sehubungan dengan hal diatas, mohon Bapak/Ibu dapat segera melakukan pembayaran dengan cara:	
                        </p>
				<p>
				>&nbsp;&nbsp;<b>Transfer melalui no VA BCA {{nomor_acc_bca}} atau Mandiri VA {{nomor_acc_mandiri}} </b> atas nama Bapak/Ibu <b> {{customer_name}}</b><br/>
				>&nbsp;&nbsp;Membayar langsung ke kasir penerimaan Citra Maja Raya, dengan cash atau giro/cek jatuh tempo atau kartu kredit (dikenakan biaya administrasi sebesar 100/97,5 X jumlah yang dibayar).<br/>
				</p>
							';
			
			$tpl7 ='Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas. Bapak/Ibu dapat menghubungi petugas Collection di no. telp. <b>6198177 ext. 712</b>
					<br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. ';
			
			$tpl8 = 'Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran tunggakan diatas bersamaan dengan angsuran bulan berjalan. Untuk tindak lanjut penyelesaian dapat menghubungi petugas Collection kami, <b>sdri Dhea</b> di pesawat <b> (62 21) 22596888 ext 163.</b>
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
                <p class="spstyle_p">Tangerang, <b>{{tanggal_print_w}}</b></p>
                <p class="spstyle_p">No	: <b>{{nomor_sp_teratas}}</b><br/>
                    Hal	: <b>Surat  Pemberitahuan Pembatalan</b></p> <br/>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p><br/>

                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">'; 
			
			$tpl10 = 'Kami memberikan waktu sampai dengan tanggal <b>{{max_date_w}}</b> untuk penyelesaian pembayaran diatas. Apabila sampai dengan tanggal tersebut diatas Bapak/Ibu masih belum melunasinya, maka dengan sangat menyesal kami mengganggap Bapak/Ibu membatalkan pemesanan rumah tersebut. <b>Keseluruhan uang</b> yang telah Bapak/Ibu bayarkan <b>tidak dapat dikembalikan.</b> Dengan demikian kami <b>berhak</b> menjual kembali rumah tersebut kepada pihak lain.
			<br>
			<br>
			Untuk tindak lanjut penyelesaian dapat menghubungi petugas Collection kami, di no. telp. <b>6198177 ext. 712.</b>
								
					<br/>
            Demikian hal ini kami sampaikan, atas perhatian dan kerjasama yang baik dari Bapak/Ibu kami ucapkan terima kasih. '; 
			
			$tpl11 = '</div>
                <!--<br/>--><br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
				<b> {{pt_name }} </b></br>
                <br/>
                <br/>
                <br/>
                <br/>
                <b><u>Annie Sularni</u></b><br/>
				<!-- --------------------------------------<br/> -->
				Spv. Collection
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <p class="spstyle_p_small">Note : Mohon abaikan surat ini apabila Bapak/Ibu sudah melakukan pembayaran, dan bukti pembayaran dapat di email ke alamat : <u>dhea.pramesuari@citramaja.com</u> untuk melakukan pengecekan lebih lanjut</p>
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
                <b><u>Andrey Christianto</b></u><br/>
				<!-- --------------------------------------<br/> -->
				Finance Manager
				<!--{{salesman_name}} (Sales)<br/>-->
                </p>

                <!--<p class="spstyle_p_small"><b>Note</b> : <i>Apabila pada saat surat ini diterima Bapak / Ibu telah melakukan transfer ke rekening kami, mohon untuk segera menghubungi kami, sehingga kami dapat melakukan pengecekan lebih lanjut.</i></p>-->
                </body>
                ';
			
        if($spke==1){
            $tpl = $tpl1.$tpl3.$tpl6.$tpl8.$tpl11;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl6.$tpl8.$tpl11;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl4.$tpl6.$tpl8.$tpl11;
        }
        elseif($spke==4){
            $tpl = $tpl9.$tpl5.$tpl12;
        }else{
            $tpl = $tpl1.$tpl3.$tpl6.$tpl7.$tpl11;
        }
        
        return $tpl;
    }
}
