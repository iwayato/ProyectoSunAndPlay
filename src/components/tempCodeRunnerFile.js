//Referencia a la tacha definida por id
const refTacha = ref(db, 'tachas/' + id);

onValue(refTacha, (snapshot) => {
    const dataTacha = snapshot.val();
    console.log(dataTacha);
})