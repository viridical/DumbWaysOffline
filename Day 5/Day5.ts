interface Siswa {
    name: string
    class: string
    score: number
}
const  daftarSiswa: Siswa[] = [
    { name: "Fizi", class: "Full Stack B", score: 50},
    { name: "Mail", class: "Full Stack A", score: 100},
    { name: "Upin", class: "Full Stack A", score: 90},
    { name: "Ipin", class: "Full Stack A", score: 90},
    { name: "Ijat", class: "Backend Core", score: 95},
    { name: "Ehsan", class: "Full Stack B", score: 60},
    { name: "Susanti", class: "Full Stack B", score: 93},
    { name: "Jarjit", class: "Full Stack B", score: 80},
    { name: "Meimei", class: "Full Stack A", score: 100},
    { name: "Dzul", class: "Full Stack A", score: 69},
    { name: "Devi", class: "Full Stack B", score: 90}
];

const tableBody = document.getElementById('tableBody') as HTMLTableSectionElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const averageScoreElement = document.getElementById('averageScore') as HTMLSpanElement;

function tampilkanTabel(dataYangMauDitampilkan: Siswa[]): void {
    tableBody.innerHTML = "";
    let arrayHTML = dataYangMauDitampilkan.map(function(siswa: Siswa, index: number): string {
       let barisHTML = `
           <tr>
               <td>${index + 1}</td>
               <td>${siswa.name}</td>
               <td><span class="badge badge-class">${siswa.class}</span></td>
               <td class="text-center"><span class="badge badge-score">${siswa.score}</span></td>
           </tr>
    `;
        return barisHTML;
    });
    let gabunganHTML = arrayHTML.join('');
    tableBody.innerHTML = gabunganHTML;
    if (dataYangMauDitampilkan.length === 0) {
        averageScoreElement.innerText = "0";
        return;
    }
    let totalNilai = dataYangMauDitampilkan.reduce(function(totalSementara: number, siswa: Siswa): number {
        return totalSementara + siswa.score;
    }, 0);
    let rataRata = totalNilai / dataYangMauDitampilkan.length;

    averageScoreElement.innerText = rataRata.toFixed(1);
}

searchInput.addEventListener('input', function(){
    let kataKunci = searchInput.value.toLowerCase();
    let hasilPencarian = daftarSiswa.filter(function(siswa: Siswa): boolean{
        let namaSiswa = siswa.name.toLowerCase();
        return namaSiswa.includes(kataKunci);
    });
    tampilkanTabel(hasilPencarian);
});

tampilkanTabel(daftarSiswa);

export{}