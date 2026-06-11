import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const WSP = '543541548053'
const API_URL = '/api/disponibilidad'
const CLIMA_KEY = 'IfltJvQV87vmStKapeMIGw8EVsnR2FIc'
const CLIMA_LAT = -31.4285
const CLIMA_LON = -64.4872

/* ── Traducciones ── */
const I18N = {
  es: {
    // Nav
    navNosotros:'Quiénes somos', navAlojamientos:'Alojamientos', navInfo:'Info importante',
    navServicios:'Servicios', navClima:'Clima', navTestimonios:'Reseñas',
    navUbicacion:'Ubicación', navCta:'Consultar →',
    // Banner
    bannerIngreso:'Ingreso', bannerEgreso:'Egreso', bannerHuespedes:'Huéspedes',
    bannerTipo:'Tipo', bannerModificar:'← Modificar búsqueda',
    bannerNochesLabel:'Estadía', bannerNoche:'noche', bannerNoches:'noches',
    franjaTexto:'¿Te interesa algún alojamiento? Antes de consultar, te recomendamos leer la <span style="color:var(--oro);font-weight:700;">información importante</span>',
    // Estados
    cargando:'Consultando disponibilidad…',
    sinResultados:'No se encontraron alojamientos para las fechas seleccionadas.',
    volverIntentar:'← Volver e intentar de nuevo',
    sinDispTitulo:'No hay disponibilidad para el rango de fechas seleccionadas',
    sinDispSub:'Conocé nuestros alojamientos y escribinos por WhatsApp para consultar disponibilidad futura',
    // Resultados
    dispDisponibles:'Disponibles', dispTuSeleccion:'Tu selección',
    dispOtrasOpciones:'Otras opciones disponibles', dispNoDisponibles:'No disponibles',
    // Badges / card
    badgeSi:'Disponible', badgeNo:'No disponible',
    btnWsp:'Consultar por WhatsApp',
    unidad:'unidad disponible', unidades:'unidades disponibles',
    // Tipo labels
    tipoCualquiera:'Cualquier tipo', tipoHabitacion:'Habitación de hotel',
    tipoCabana:'Cabaña', tipoApart:'Apart Hotel',
    // Alojamientos
    habNombre:'Habitaciones de hotel',
    habMeta1:'1–4 personas', habMeta2:'Desayuno incluido',
    habFeatures:['Desayuno buffet','Aire acond. 24hs','Calefacción','Limpieza diaria','Baño privado'],
    apNombre:'Apart Hotel',
    apMeta1:'Hasta 4/5 personas', apMeta2:'2 hab. combinadas',
    apFeatures:['Cocina equipada','Aire acond. 24hs','Calefacción','Baño privado','Limpieza c/3 días'],
    ccNombre:'Cabaña chica',
    ccMeta1:'Hasta 3 personas', ccMeta2:'1 dormitorio',
    ccFeatures:['Aire frío/calor','Cocina equipada','Asador privado','Limpieza c/3 días'],
    cmNombre:'Cabaña mediana',
    cmMeta1:'Hasta 5/6 personas', cmMeta2:'1 dormitorio',
    cmFeatures:['Aire frío/calor','Cocina equipada','Asador privado','Limpieza c/3 días'],
    cgNombre:'Cabaña grande',
    cgMeta1:'Hasta 7/8 personas', cgMeta2:'2 dormitorios',
    cgFeatures:['Aire frío/calor','Cocina equipada','Asador privado','Limpieza c/3 días'],
    // Clima
    climaLabel:'Villa Carlos Paz · Sierras de Córdoba', climaTitle:'Clima para tu viaje',
    climaDesc:'Consultá el pronóstico antes de preparar tu equipaje. Datos en tiempo real, actualizados automáticamente.',
    climaNote:'Datos provistos por Tomorrow.io · Actualizado automáticamente',
    hoy:'Hoy', sensacion:'Sensación térmica', humedad:'Humedad', viento:'Viento',
    dias:['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
    climaCargando:'Cargando el clima de Villa Carlos Paz…',
    climaError:'No se pudo cargar el clima. Intentá más tarde.',
    // Info
    infoLabel:'Información importante', infoTitle:'Antes de reservar, leé esto',
    infoCta:'¿Ya leíste toda la información? Escribinos y te respondemos a la brevedad.',
    infoBtnWsp:'Consultar por WhatsApp',
    acordRes:'Condiciones de reserva',
    acordResL1:'Seña', acordResV1:'50% anticipado para confirmar la reserva · El saldo restante se abona al ingreso',
    acordResL2:'Estadía mínima', acordResV2:'Variable según temporada — consultanos por disponibilidad',
    acordCancel:'Política de cancelación',
    acordCancelTxt:'<strong>Cancelación flexible — seña reutilizable.</strong> Ante la cancelación del huésped, el importe abonado como seña se asignará como crédito en pesos para utilizar en una futura reserva. Debe realizarse dentro de los 6 meses siguientes y estará sujeta a disponibilidad.',
    acordAc:'Aire acondicionado — importante',
    acordAcL1:'Cabañas', acordAcV1:'Habilitado de 12:00 a 17:00 hs incluido en la tarifa. Fuera de ese horario tiene un costo adicional — consultanos al reservar.',
    acordAcL2:'Habitaciones y Apart Hotel', acordAcV2:'Aire acondicionado disponible las 24 hs sin cargo adicional.',
    acordHora:'Horarios de ingreso y egreso',
    acordHoraL1:'Check-in', acordHoraV1:'A partir de las 13:00 hs',
    acordHoraL2:'Check-out', acordHoraV2:'Hasta las 10:00 hs',
    acordHoraNote:'Los horarios son flexibles según disponibilidad. Consultanos si necesitás un horario especial.',
    acordNormas:'Normas del alojamiento',
    acordNormasSi:'✓ Se acepta',
    acordNormasSiV:'Familias · Parejas · Grupos de jóvenes · Niños · Bebés · Personas con movilidad reducida · Mascotas <em>(solo en cabañas)</em> · Visitas <em>(con costo adicional en temporada alta)</em>',
    acordNormasNo:'✗ No se permite',
    acordNormasNoV:'Fumar en espacios interiores · Fiestas · Música alta · Ingreso de personas no registradas en la reserva',
    acordGar:'Política de garantía',
    acordGarIntro:'Se solicita al momento del ingreso:',
    acordGarLi1:'DNI o Pasaporte del titular de la reserva y de todos los integrantes del grupo',
    acordGarLi2:'Completar la planilla de ingreso con datos personales',
    acordGarLi3:'Firma de contrato de locación temporal',
    acordPago:'Formas de pago',
    acordPagoL1:'Transferencia', acordPagoV1:'CBU, CVU o Alias disponible al confirmar la reserva (bancos y billeteras virtuales)',
    acordPagoL2:'Tarjeta de crédito / débito', acordPagoV2:'Aceptamos tarjetas. Las tarjetas de crédito tienen recargo según la cantidad de cuotas. Consultar al reservar.',
    acordPagoL3:'Efectivo', acordPagoV3:'Pesos argentinos y dólares',
    // Servicios
    servLabel:'Lo que ofrecemos', servTitle:'Nuestros servicios',
    servPileta:'Pileta', servPiletaD:'Compartida para todos los huéspedes',
    servParque:'Parque', servParqueD:'Amplio y verde',
    servCochera:'Cochera', servCocheraD:'Techada y segura',
    servAsadores:'Asadores', servAsadoresD:'Privado en cada cabaña',
    servDesayuno:'Desayuno buffet', servDesayunoD:'Casero, de Celia',
    servWifi:'WiFi', servWifiD:'Todo el complejo',
    servAc:'Aire acond.', servAcD:'Frío y calor',
    servLimpieza:'Limpieza', servLimpiezaD:'Servicio de mucamas',
    servAlgarrobo:'El Algarrobo', servAlgarroboD:'Espacio compartido bicentenario',
    servJuegos:'Juegos para niños', servJuegosD:'Para jugar y divertirse en familia',
    servSeguridad:'Seguridad', servSeguridadD:'Rejas, alarma y cámaras',
    servRopa:'Ropa blanca', servRopaD:'Sábanas, toallas y toallones',
    // Footer
    footerDesc:'Complejo familiar atendido por sus dueños, donde el trato personalizado y el clima hogareño hacen que cada huésped se sienta en casa. Rodeados de las sierras cordobesas y a orillas del río San Antonio.',
    footerAloj:'Alojamientos',
    footerAloj1:'Cabaña chica (hasta 3 pers.)', footerAloj2:'Cabaña mediana (hasta 6 pers.)',
    footerAloj3:'Cabaña grande (hasta 8 pers.)', footerAloj4:'Habitaciones de hotel', footerAloj5:'Apart Hotel',
    footerInfo:'Información', footerCheckin:'Check-in: 13:00 hs', footerCheckout:'Check-out: 10:00 hs',
    footerTambien:'También en',
    footerCopy:'© 2026 Hotel y Cabañas Brisas de Oro · Villa Carlos Paz, Córdoba, Argentina',
    footerCopyMobile:'© 2026 Brisas de Oro · Villa Carlos Paz, Córdoba, Argentina',
  },
  en: {
    navNosotros:'About us', navAlojamientos:'Accommodations', navInfo:'Important info',
    navServicios:'Services', navClima:'Weather', navTestimonios:'Reviews',
    navUbicacion:'Location', navCta:'Inquire →',
    bannerIngreso:'Check-in', bannerEgreso:'Check-out', bannerHuespedes:'Guests',
    bannerTipo:'Type', bannerModificar:'← Modify search',
    bannerNochesLabel:'Stay', bannerNoche:'night', bannerNoches:'nights',
    franjaTexto:'Interested in an accommodation? Before inquiring, we recommend reading the <span style="color:var(--oro);font-weight:700;">important information</span>',
    cargando:'Checking availability…',
    sinResultados:'No accommodations found for the selected dates.',
    volverIntentar:'← Go back and try again',
    sinDispTitulo:'We didn\'t find availability for the selected dates',
    sinDispSub:'You can still contact us for other dates or future availability',
    dispDisponibles:'Available', dispTuSeleccion:'Your selection',
    dispOtrasOpciones:'Other available options', dispNoDisponibles:'Unavailable',
    badgeSi:'Available', badgeNo:'Not available',
    btnWsp:'Inquire on WhatsApp',
    unidad:'unit available', unidades:'units available',
    tipoCualquiera:'Any type', tipoHabitacion:'Hotel room',
    tipoCabana:'Cabin', tipoApart:'Apart Hotel',
    habNombre:'Hotel rooms',
    habMeta1:'1–4 guests', habMeta2:'Breakfast included',
    habFeatures:['Buffet breakfast','A/C 24hs','Heating','Daily cleaning','Private bathroom'],
    apNombre:'Apart Hotel',
    apMeta1:'Up to 4/5 guests', apMeta2:'2 combined rooms',
    apFeatures:['Full kitchen','A/C 24hs','Heating','Private bathroom','Cleaning every 3 days'],
    ccNombre:'Small cabin',
    ccMeta1:'Up to 3 guests', ccMeta2:'1 bedroom',
    ccFeatures:['Hot & cold A/C','Full kitchen','Private BBQ','Cleaning every 3 days'],
    cmNombre:'Medium cabin',
    cmMeta1:'Up to 5/6 guests', cmMeta2:'1 bedroom',
    cmFeatures:['Hot & cold A/C','Full kitchen','Private BBQ','Cleaning every 3 days'],
    cgNombre:'Large cabin',
    cgMeta1:'Up to 7/8 guests', cgMeta2:'2 bedrooms',
    cgFeatures:['Hot & cold A/C','Full kitchen','Private BBQ','Cleaning every 3 days'],
    climaLabel:'Villa Carlos Paz · Córdoba Hills', climaTitle:'Weather for your trip',
    climaDesc:'Check the forecast before packing. Real-time data, updated automatically.',
    climaNote:'Data provided by Tomorrow.io · Updated automatically',
    hoy:'Today', sensacion:'Feels like', humedad:'Humidity', viento:'Wind',
    dias:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    climaCargando:'Loading weather for Villa Carlos Paz…',
    climaError:'Could not load weather. Please try later.',
    infoLabel:'Important info', infoTitle:'Before booking, read this',
    infoCta:"Read all the information? Write to us and we'll reply shortly.",
    infoBtnWsp:'Inquire on WhatsApp',
    acordRes:'Booking conditions',
    acordResL1:'Deposit', acordResV1:'50% advance payment to confirm the booking · Remaining balance due at check-in',
    acordResL2:'Minimum stay', acordResV2:'Varies by season — contact us for availability',
    acordCancel:'Cancellation policy',
    acordCancelTxt:'<strong>Flexible cancellation — reusable deposit.</strong> If the guest cancels, the deposit paid will be assigned as a credit in pesos to be used for a future booking. Must be made within the following 6 months and is subject to availability.',
    acordAc:'Air conditioning — important',
    acordAcL1:'Cabins', acordAcV1:'Available from 12:00 to 17:00 included in the rate. Outside those hours an additional charge applies — ask us when booking.',
    acordAcL2:'Rooms & Apart Hotel', acordAcV2:'Air conditioning available 24 hours at no extra charge.',
    acordHora:'Check-in and check-out times',
    acordHoraL1:'Check-in', acordHoraV1:'From 13:00 hs',
    acordHoraL2:'Check-out', acordHoraV2:'Until 10:00 hs',
    acordHoraNote:'Times are flexible depending on availability. Contact us if you need a special schedule.',
    acordNormas:'House rules',
    acordNormasSi:'✓ Allowed',
    acordNormasSiV:'Families · Couples · Groups of young people · Children · Babies · Persons with reduced mobility · Pets <em>(cabins only)</em> · Visitors <em>(extra charge during high season)</em>',
    acordNormasNo:'✗ Not allowed',
    acordNormasNoV:'Smoking indoors · Parties · Loud music · Unregistered guests',
    acordGar:'Security policy',
    acordGarIntro:'Required at check-in:',
    acordGarLi1:'National ID or Passport of the booking holder and all group members',
    acordGarLi2:'Fill in the check-in form with personal details',
    acordGarLi3:'Sign the temporary rental agreement',
    acordPago:'Payment methods',
    acordPagoL1:'Bank transfer', acordPagoV1:'CBU, CVU or Alias provided upon booking confirmation (banks and digital wallets)',
    acordPagoL2:'Credit / debit card', acordPagoV2:'We accept cards. Credit cards carry a surcharge depending on the number of installments. Ask when booking.',
    acordPagoL3:'Cash', acordPagoV3:'Argentine pesos and US dollars',
    servLabel:'What we offer', servTitle:'Our services',
    servPileta:'Pool', servPiletaD:'Shared by all guests',
    servParque:'Grounds', servParqueD:'Spacious and green',
    servCochera:'Parking', servCocheraD:'Covered and secure',
    servAsadores:'BBQ grills', servAsadoresD:'Private BBQ per cabin',
    servDesayuno:'Buffet breakfast', servDesayunoD:'Homemade, by Celia',
    servWifi:'WiFi', servWifiD:'Throughout the resort',
    servAc:'Air cond.', servAcD:'Hot & cold',
    servLimpieza:'Housekeeping', servLimpiezaD:'Daily maid service',
    servAlgarrobo:'El Algarrobo', servAlgarroboD:'Shared bicentennial space',
    servJuegos:'Kids playground', servJuegosD:'Play and fun for everyone',
    servSeguridad:'Security', servSeguridadD:'Fences, alarm & cameras',
    servRopa:'Bed & bath linen', servRopaD:'Sheets, towels and bath towels',
    // Footer
    footerDesc:'A family-run property managed by its owners, where personalized attention and a homely atmosphere make every guest feel at home. Surrounded by the Córdoba hills and on the banks of the San Antonio river.',
    footerAloj:'Accommodations',
    footerAloj1:'Small cabin (up to 3 guests)', footerAloj2:'Medium cabin (up to 6 guests)',
    footerAloj3:'Large cabin (up to 8 guests)', footerAloj4:'Hotel rooms', footerAloj5:'Apart Hotel',
    footerInfo:'Information', footerCheckin:'Check-in: 1:00 pm', footerCheckout:'Check-out: 10:00 am',
    footerTambien:'Also on',
    footerCopy:'© 2026 Hotel y Cabañas Brisas de Oro · Villa Carlos Paz, Córdoba, Argentina',
    footerCopyMobile:'© 2026 Brisas de Oro · Villa Carlos Paz, Córdoba, Argentina',
  },
  pt: {
    navNosotros:'Quem somos', navAlojamientos:'Hospedagem', navInfo:'Info importante',
    navServicios:'Serviços', navClima:'Clima', navTestimonios:'Avaliações',
    navUbicacion:'Localização', navCta:'Consultar →',
    bannerIngreso:'Chegada', bannerEgreso:'Saída', bannerHuespedes:'Hóspedes',
    bannerTipo:'Tipo', bannerModificar:'← Modificar busca',
    bannerNochesLabel:'Estadia', bannerNoche:'noite', bannerNoches:'noites',
    franjaTexto:'Tem interesse em alguma acomodação? Antes de consultar, recomendamos ler as <span style="color:var(--oro);font-weight:700;">informações importantes</span>',
    cargando:'Consultando disponibilidade…',
    sinResultados:'Nenhuma hospedagem encontrada para as datas selecionadas.',
    volverIntentar:'← Voltar e tentar novamente',
    sinDispTitulo:'Não encontramos disponibilidade para as datas selecionadas',
    sinDispSub:'Mesmo assim, pode nos consultar por outras datas ou disponibilidade futura',
    dispDisponibles:'Disponíveis', dispTuSeleccion:'Sua seleção',
    dispOtrasOpciones:'Outras opções disponíveis', dispNoDisponibles:'Indisponíveis',
    badgeSi:'Disponível', badgeNo:'Indisponível',
    btnWsp:'Consultar pelo WhatsApp',
    unidad:'unidade disponível', unidades:'unidades disponíveis',
    tipoCualquiera:'Qualquer tipo', tipoHabitacion:'Quarto de hotel',
    tipoCabana:'Chalé', tipoApart:'Apart Hotel',
    habNombre:'Quartos de hotel',
    habMeta1:'1–4 pessoas', habMeta2:'Café incluído',
    habFeatures:['Café buffet','A/C 24hs','Aquecimento','Limpeza diária','Banheiro privativo'],
    apNombre:'Apart Hotel',
    apMeta1:'Até 4/5 pessoas', apMeta2:'2 quartos combinados',
    apFeatures:['Cozinha equipada','A/C 24hs','Aquecimento','Banheiro privativo','Limpeza a cada 3 dias'],
    ccNombre:'Chalé pequeno',
    ccMeta1:'Até 3 pessoas', ccMeta2:'1 quarto',
    ccFeatures:['A/C frio e calor','Cozinha equipada','Churrasqueira privativa','Limpeza a cada 3 dias'],
    cmNombre:'Chalé médio',
    cmMeta1:'Até 5/6 pessoas', cmMeta2:'1 quarto',
    cmFeatures:['A/C frio e calor','Cozinha equipada','Churrasqueira privativa','Limpeza a cada 3 dias'],
    cgNombre:'Chalé grande',
    cgMeta1:'Até 7/8 pessoas', cgMeta2:'2 quartos',
    cgFeatures:['A/C frio e calor','Cozinha equipada','Churrasqueira privativa','Limpeza a cada 3 dias'],
    climaLabel:'Villa Carlos Paz · Serras de Córdoba', climaTitle:'Clima para a sua viagem',
    climaDesc:'Confira a previsão antes de fazer as malas. Dados em tempo real, atualizados automaticamente.',
    climaNote:'Dados fornecidos por Tomorrow.io · Atualizado automaticamente',
    hoy:'Hoje', sensacion:'Sens. térmica', humedad:'Umidade', viento:'Vento',
    dias:['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
    climaCargando:'Carregando o clima de Villa Carlos Paz…',
    climaError:'Não foi possível carregar o clima. Tente mais tarde.',
    infoLabel:'Informações importantes', infoTitle:'Antes de reservar, leia isto',
    infoCta:'Leu todas as informações? Escreva-nos e respondemos em breve.',
    infoBtnWsp:'Consultar pelo WhatsApp',
    acordRes:'Condições de reserva',
    acordResL1:'Sinal', acordResV1:'50% antecipado para confirmar a reserva · O saldo restante é pago na chegada',
    acordResL2:'Estadia mínima', acordResV2:'Varia conforme a temporada — consulte disponibilidade',
    acordCancel:'Política de cancelamento',
    acordCancelTxt:'<strong>Cancelamento flexível — sinal reutilizável.</strong> Em caso de cancelamento pelo hóspede, o valor pago como sinal será convertido em crédito em pesos para uso em uma futura reserva. Deve ser realizado dentro dos 6 meses seguintes e estará sujeito à disponibilidade.',
    acordAc:'Ar-condicionado — importante',
    acordAcL1:'Chalés', acordAcV1:'Disponível das 12:00 às 17:00 incluído na tarifa. Fora desse horário tem custo adicional — consulte ao reservar.',
    acordAcL2:'Quartos e Apart Hotel', acordAcV2:'Ar-condicionado disponível 24 horas sem custo adicional.',
    acordHora:'Horários de entrada e saída',
    acordHoraL1:'Check-in', acordHoraV1:'A partir das 13:00 hs',
    acordHoraL2:'Check-out', acordHoraV2:'Até as 10:00 hs',
    acordHoraNote:'Os horários são flexíveis conforme disponibilidade. Consulte-nos se precisar de um horário especial.',
    acordNormas:'Regras do alojamento',
    acordNormasSi:'✓ Permitido',
    acordNormasSiV:'Famílias · Casais · Grupos de jovens · Crianças · Bebês · Pessoas com mobilidade reduzida · Animais de estimação <em>(apenas nos chalés)</em> · Visitas <em>(custo adicional na alta temporada)</em>',
    acordNormasNo:'✗ Não permitido',
    acordNormasNoV:'Fumar em espaços internos · Festas · Música alta · Entrada de pessoas não registradas na reserva',
    acordGar:'Política de garantia',
    acordGarIntro:'Solicitado no momento do check-in:',
    acordGarLi1:'RG, CPF ou Passaporte do titular da reserva e de todos os integrantes do grupo',
    acordGarLi2:'Preencher a ficha de entrada com dados pessoais',
    acordGarLi3:'Assinar o contrato de locação temporária',
    acordPago:'Formas de pagamento',
    acordPagoL1:'Transferência', acordPagoV1:'CBU, CVU ou Alias disponível ao confirmar a reserva (bancos e carteiras digitais)',
    acordPagoL2:'Cartão de crédito / débito', acordPagoV2:'Aceitamos cartões. Cartões de crédito têm acréscimo conforme o número de parcelas. Consulte ao reservar.',
    acordPagoL3:'Dinheiro', acordPagoV3:'Pesos argentinos e dólares americanos',
    servLabel:'O que oferecemos', servTitle:'Nossos serviços',
    servPileta:'Piscina', servPiletaD:'Compartilhada por todos os hóspedes',
    servParque:'Jardim', servParqueD:'Amplo e verde',
    servCochera:'Estacionamento', servCocheraD:'Coberto e seguro',
    servAsadores:'Churrasqueiras', servAsadoresD:'Privativo em cada chalé',
    servDesayuno:'Café buffet', servDesayunoD:'Caseiro, da Celia',
    servWifi:'WiFi', servWifiD:'Em todo o complexo',
    servAc:'Ar-cond.', servAcD:'Frio e calor',
    servLimpieza:'Limpeza', servLimpiezaD:'Serviço de camareira',
    servAlgarrobo:'El Algarrobo', servAlgarroboD:'Espaço compartilhado bicentenário',
    servJuegos:'Brinquedos', servJuegosD:'Diversão para toda a família',
    servSeguridad:'Segurança', servSeguridadD:'Grades, alarme e câmeras',
    servRopa:'Roupa de cama e banho', servRopaD:'Lençóis, toalhas e toalhões',
    // Footer
    footerDesc:'Complexo familiar atendido pelos proprietários, onde a atenção personalizada e o clima acolhedor fazem com que cada hóspede se sinta em casa. Rodeado pelas serras de Córdoba e às margens do rio San Antonio.',
    footerAloj:'Hospedagem',
    footerAloj1:'Chalé pequeno (até 3 pess.)', footerAloj2:'Chalé médio (até 6 pess.)',
    footerAloj3:'Chalé grande (até 8 pess.)', footerAloj4:'Quartos de hotel', footerAloj5:'Apart Hotel',
    footerInfo:'Informações', footerCheckin:'Check-in: 13:00 hs', footerCheckout:'Check-out: 10:00 hs',
    footerTambien:'Também em',
    footerCopy:'© 2026 Hotel y Cabañas Brisas de Oro · Villa Carlos Paz, Córdoba, Argentina',
    footerCopyMobile:'© 2026 Brisas de Oro · Villa Carlos Paz, Córdoba, Argentina',
  },
}

/* ── Base de alojamientos (solo lo que no cambia con el idioma) ── */
const ALOJ_BASE = {
  habitaciones: { id:'habitaciones', tipo:'Habitación', iconoMeta1:'personas', iconoMeta2:'desayuno',    fotos:['/fotos/habitaciones/portada.jpeg','/fotos/habitaciones/1.jpeg','/fotos/habitaciones/2.jpeg','/fotos/habitaciones/3.jpeg','/fotos/habitaciones/4.jpeg','/fotos/habitaciones/5.jpeg','/fotos/habitaciones/6.jpeg','/fotos/habitaciones/7.jpeg'] },
  aparts:       { id:'aparts',       tipo:'Apart Hotel', iconoMeta1:'personas', iconoMeta2:'habitaciones', fotos:['/fotos/apart-hotel/portada.jpeg','/fotos/apart-hotel/1.jpeg','/fotos/apart-hotel/2.jpeg','/fotos/apart-hotel/3.jpeg','/fotos/apart-hotel/4.jpeg'] },
  cabanaChica:  { id:'cabanaChica',  tipo:'Cabaña',    iconoMeta1:'personas', iconoMeta2:'cama',         fotos:['/fotos/cabana-chica/portada.jpeg','/fotos/cabana-chica/1.jpeg','/fotos/cabana-chica/2.jpeg','/fotos/cabana-chica/3.jpeg','/fotos/cabana-chica/4.jpeg','/fotos/cabana-chica/5.jpeg'] },
  cabanaMediana:{ id:'cabanaMediana',tipo:'Cabaña',    iconoMeta1:'personas', iconoMeta2:'cama',         fotos:['/fotos/cabana-mediana/portada.webp','/fotos/cabana-mediana/1.jpeg','/fotos/cabana-mediana/2.jpeg','/fotos/cabana-mediana/3.jpeg','/fotos/cabana-mediana/4.jpeg','/fotos/cabana-mediana/5.jpeg','/fotos/cabana-mediana/6.jpeg'] },
  cabanaGrande: { id:'cabanaGrande', tipo:'Cabaña',    iconoMeta1:'personas', iconoMeta2:'camas',        fotos:['/fotos/cabana-grande/portada.jpeg','/fotos/cabana-grande/1.jpeg','/fotos/cabana-grande/2.jpeg','/fotos/cabana-grande/3.jpeg','/fotos/cabana-grande/4.jpeg','/fotos/cabana-grande/5.jpeg','/fotos/cabana-grande/6.jpeg'] },
}

/* Aplica las traducciones de `t` sobre cada entrada del API response */
function parsearRespuesta(data, t) {
  const tradMeta = {
    habitaciones: { nombre:t.habNombre, meta1:t.habMeta1, meta2:t.habMeta2, features:t.habFeatures },
    aparts:       { nombre:t.apNombre,  meta1:t.apMeta1,  meta2:t.apMeta2,  features:t.apFeatures },
    cabanaChica:  { nombre:t.ccNombre,  meta1:t.ccMeta1,  meta2:t.ccMeta2,  features:t.ccFeatures },
    cabanaMediana:{ nombre:t.cmNombre,  meta1:t.cmMeta1,  meta2:t.cmMeta2,  features:t.cmFeatures },
    cabanaGrande: { nombre:t.cgNombre,  meta1:t.cgMeta1,  meta2:t.cgMeta2,  features:t.cgFeatures },
  }
  return Object.entries(ALOJ_BASE).map(([clave, base]) => {
    const info = data[clave] || {}
    return { ...base, ...tradMeta[clave], disponible: info.disponible ?? false, unidadesDisponibles: info.unidadesDisponibles ?? 0 }
  })
}

function normalizarTipo(t) {
  return (t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '')
}

function tipoCoincide(tipoQuery, tipoResultado) {
  if (!tipoQuery || normalizarTipo(tipoQuery) === 'cualquiera') return true
  const q = normalizarTipo(tipoQuery)
  const r = normalizarTipo(tipoResultado || '')
  return r.includes(q) || q.includes(r)
}

function formatFecha(s) {
  if (!s) return '—'
  const [y, m, d] = s.split('-')
  return d && m && y ? `${d}/${m}/${y}` : s
}

function etiquetaTipo(tipo, t) {
  const n = normalizarTipo(tipo || '')
  if (!tipo || n === 'cualquiera') return t.tipoCualquiera
  if (n === 'habitacion') return t.tipoHabitacion
  if (n === 'cabana') return t.tipoCabana
  if (n === 'aparthotel' || n === 'apart') return t.tipoApart
  return tipo
}

/* ── Clima helpers ── */
function esDeDia() {
  const h = parseInt(new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Cordoba', hour: 'numeric', hour12: false }))
  return h >= 7 && h < 19
}

function getSvgIcono(code, size) {
  const px = size || 48
  const noche = !esDeDia()
  const SVG = {
    sol_d:`<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="#F5A623"/><g stroke="#F5A623" stroke-width="3" stroke-linecap="round"><line x1="32" y1="4" x2="32" y2="12"/><line x1="32" y1="52" x2="32" y2="60"/><line x1="4" y1="32" x2="12" y2="32"/><line x1="52" y1="32" x2="60" y2="32"/><line x1="11" y1="11" x2="17" y2="17"/><line x1="47" y1="47" x2="53" y2="53"/><line x1="53" y1="11" x2="47" y2="17"/><line x1="17" y1="47" x2="11" y2="53"/></g></svg>`,
    sol_n:`<svg viewBox="0 0 64 64"><path d="M40 32a16 16 0 1 1-16-16 12 12 0 0 0 16 16z" fill="#7986CB"/><circle cx="46" cy="14" r="2" fill="#FFD600" opacity="0.9"/><circle cx="52" cy="20" r="1.5" fill="#FFD600" opacity="0.9"/><circle cx="50" cy="10" r="1.2" fill="#FFD600" opacity="0.9"/></svg>`,
    nube:`<svg viewBox="0 0 64 64"><ellipse cx="26" cy="36" rx="18" ry="13" fill="#B0BEC5"/><ellipse cx="26" cy="30" rx="12" ry="10" fill="#CFD8DC"/><ellipse cx="36" cy="28" rx="14" ry="11" fill="#CFD8DC"/><ellipse cx="40" cy="36" rx="12" ry="10" fill="#B0BEC5"/><rect x="16" y="34" width="36" height="12" rx="6" fill="#B0BEC5"/></svg>`,
    sn_d:`<svg viewBox="0 0 64 64"><circle cx="22" cy="20" r="10" fill="#F5A623"/><g stroke="#F5A623" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="6" x2="22" y2="11"/><line x1="22" y1="29" x2="22" y2="34"/><line x1="8" y1="20" x2="13" y2="20"/><line x1="31" y1="20" x2="36" y2="20"/><line x1="12" y1="10" x2="16" y2="14"/><line x1="32" y1="10" x2="28" y2="14"/></g><ellipse cx="36" cy="44" rx="18" ry="12" fill="#90A4AE"/><ellipse cx="30" cy="38" rx="12" ry="9" fill="#B0BEC5"/><ellipse cx="42" cy="36" rx="14" ry="10" fill="#B0BEC5"/><rect x="22" y="42" width="32" height="10" rx="5" fill="#90A4AE"/></svg>`,
    sn_n:`<svg viewBox="0 0 64 64"><path d="M26 18a10 10 0 1 1-10-10 8 8 0 0 0 10 10z" fill="#7986CB"/><circle cx="32" cy="8" r="1.5" fill="#FFD600" opacity="0.85"/><circle cx="36" cy="14" r="1.2" fill="#FFD600" opacity="0.85"/><ellipse cx="38" cy="44" rx="18" ry="12" fill="#90A4AE"/><ellipse cx="32" cy="38" rx="12" ry="9" fill="#B0BEC5"/><ellipse cx="44" cy="36" rx="14" ry="10" fill="#B0BEC5"/><rect x="24" y="42" width="32" height="10" rx="5" fill="#90A4AE"/></svg>`,
    lluvia:`<svg viewBox="0 0 64 64"><ellipse cx="28" cy="26" rx="18" ry="13" fill="#90A4AE"/><ellipse cx="28" cy="20" rx="12" ry="10" fill="#B0BEC5"/><ellipse cx="38" cy="18" rx="14" ry="11" fill="#B0BEC5"/><rect x="18" y="24" width="36" height="12" rx="6" fill="#90A4AE"/><g stroke="#5B9BD5" stroke-width="2.5" stroke-linecap="round"><line x1="24" y1="42" x2="20" y2="54"/><line x1="32" y1="42" x2="28" y2="54"/><line x1="40" y1="42" x2="36" y2="54"/></g></svg>`,
    niebla:`<svg viewBox="0 0 64 64"><g stroke="#B0BEC5" stroke-width="4" stroke-linecap="round"><line x1="10" y1="22" x2="54" y2="22"/><line x1="14" y1="32" x2="50" y2="32"/><line x1="10" y1="42" x2="54" y2="42"/></g></svg>`,
    tormenta:`<svg viewBox="0 0 64 64"><ellipse cx="28" cy="22" rx="18" ry="13" fill="#78909C"/><ellipse cx="28" cy="16" rx="12" ry="10" fill="#90A4AE"/><ellipse cx="38" cy="14" rx="14" ry="11" fill="#90A4AE"/><rect x="18" y="20" width="36" height="12" rx="6" fill="#78909C"/><polygon points="34,36 26,50 33,50 28,62 42,44 34,44" fill="#FFD600"/></svg>`,
    nieve:`<svg viewBox="0 0 64 64"><ellipse cx="28" cy="26" rx="18" ry="13" fill="#90A4AE"/><ellipse cx="28" cy="20" rx="12" ry="10" fill="#B0BEC5"/><ellipse cx="38" cy="18" rx="14" ry="11" fill="#B0BEC5"/><rect x="18" y="24" width="36" height="12" rx="6" fill="#90A4AE"/><circle cx="24" cy="48" r="3" fill="#5B9BD5"/><circle cx="32" cy="54" r="3" fill="#5B9BD5"/><circle cx="40" cy="48" r="3" fill="#5B9BD5"/><circle cx="32" cy="44" r="3" fill="#5B9BD5"/></svg>`,
  }
  let svg
  if ([1000,1100].includes(code))       svg = noche ? SVG.sol_n : SVG.sol_d
  else if (code===1101)                 svg = noche ? SVG.sn_n  : SVG.sn_d
  else if ([1102,1001].includes(code))  svg = SVG.nube
  else if ([2000,2100].includes(code))  svg = SVG.niebla
  else if ([4000,4001,4200,4201].includes(code)) svg = SVG.lluvia
  else if ([5000,5001,5100,5101,6000,6001,6200,6201,7000,7101,7102].includes(code)) svg = SVG.nieve
  else if (code===8000)                 svg = SVG.tormenta
  else                                  svg = SVG.nube
  return `<div style="width:${px}px;height:${px}px;margin:0 auto">${svg}</div>`
}

function getDesc(code, lang) {
  const map = {
    1000:{es:'Despejado',en:'Clear',pt:'Céu limpo'},
    1100:{es:'Mayormente sol',en:'Mostly clear',pt:'Maiorm. limpo'},
    1101:{es:'Parcialmente nublado',en:'Partly cloudy',pt:'Parcialm. nublado'},
    1102:{es:'Mayormente nublado',en:'Mostly cloudy',pt:'Maiorm. nublado'},
    1001:{es:'Nublado',en:'Cloudy',pt:'Nublado'},
    2000:{es:'Niebla',en:'Fog',pt:'Neblina'},
    4000:{es:'Llovizna',en:'Drizzle',pt:'Garoa'},
    4001:{es:'Lluvia',en:'Rain',pt:'Chuva'},
    4200:{es:'Lluvia ligera',en:'Light rain',pt:'Chuva leve'},
    4201:{es:'Lluvia intensa',en:'Heavy rain',pt:'Chuva forte'},
    5000:{es:'Nieve',en:'Snow',pt:'Neve'},
    8000:{es:'Tormenta',en:'Thunderstorm',pt:'Tempestade'},
  }
  return (map[code]||{})[lang] || (map[code]||{}).es || '—'
}

function getParaguita(pct) {
  const color = pct > 0 ? '#5b8fbf' : '#9ca3af'
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/></svg> <span style="color:${color};font-weight:600">${pct}%</span>`
}

/* ── Clima ── */
function SeccionClima({ lang }) {
  const [datos, setDatos] = useState(null)
  const [climaErr, setClimaErr] = useState(false)
  const t = I18N[lang] || I18N.es

  useEffect(() => {
    let mounted = true
    async function fetchData() {
      const loc = `${CLIMA_LAT},${CLIMA_LON}`
      try {
        const [rC, rD] = await Promise.all([
          fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${loc}&apikey=${CLIMA_KEY}&units=metric`),
          fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${loc}&apikey=${CLIMA_KEY}&units=metric&timesteps=1d`),
        ])
        if (!rC.ok || !rD.ok) throw new Error()
        const [curr, daily] = await Promise.all([rC.json(), rD.json()])
        if (mounted) { setDatos({ curr, daily }); setClimaErr(false) }
      } catch { if (mounted) setClimaErr(true) }
    }
    fetchData()
    const id = setInterval(fetchData, 30*60*1000)
    return () => { mounted = false; clearInterval(id) }
  }, [])

  return (
    <section id="clima" className="clima-seccion" style={{ padding:'5rem 5%' }}>
      <div className="section-inner">
        <div className="clima-header">
          <p className="section-label">{t.climaLabel}</p>
          <h2 className="section-title">{t.climaTitle}</h2>
          <div className="divider" style={{ margin:'0.9rem auto 1.8rem' }} />
          <p style={{ fontSize:'0.9rem', color:'var(--texto-suave)', maxWidth:700, margin:'0 auto', lineHeight:1.7 }}>{t.climaDesc}</p>
        </div>
        {!datos && !climaErr && <div className="clima-loading"><span style={{ fontSize:'1.5rem', display:'block', marginBottom:'0.5rem' }}>⛅</span>{t.climaCargando}</div>}
        {climaErr && <div className="clima-error"><span style={{ fontSize:'1.5rem', display:'block', marginBottom:'0.5rem' }}>🌡️</span>{t.climaError}</div>}
        {datos && (() => {
          const c = datos.curr.data.values
          const days = datos.daily.timelines.daily
          return (
            <>
              <div className="clima-actual">
                <div className="clima-icon-wrap" style={{ flexShrink:0 }}>
                  <div className="clima-tooltip">{getDesc(c.weatherCode, lang)}</div>
                  <div dangerouslySetInnerHTML={{ __html: getSvgIcono(c.weatherCode, 72) }} />
                </div>
                <div className="clima-actual-temp">{Math.round(c.temperature)}°</div>
                <div className="clima-actual-info">
                  <div className="clima-actual-loc">
                    <svg width="10" height="12" viewBox="0 0 11 14" fill="var(--oro)"><path d="M5.5 0C2.46 0 0 2.46 0 5.5C0 9.625 5.5 14 5.5 14C5.5 14 11 9.625 11 5.5C11 2.46 8.54 0 5.5 0ZM5.5 7.5C4.395 7.5 3.5 6.605 3.5 5.5C3.5 4.395 4.395 3.5 5.5 3.5C6.605 3.5 7.5 4.395 7.5 5.5C7.5 6.605 6.605 7.5 5.5 7.5Z" /></svg>
                    Villa Carlos Paz, Córdoba, Argentina
                  </div>
                  <div className="clima-actual-desc">{getDesc(c.weatherCode, lang)}</div>
                  <div className="clima-actual-sub">{t.sensacion}: {Math.round(c.temperatureApparent)}°&nbsp;·&nbsp;{t.humedad}: {Math.round(c.humidity)}%&nbsp;·&nbsp;{t.viento}: {Math.round(c.windSpeed)} km/h</div>
                </div>
              </div>
              <div className="clima-grid">
                {days.slice(0,6).map((day,i) => {
                  const d = day.values
                  const dt = new Date(day.time)
                  const lluvia = Math.round(d.precipitationProbabilityAvg||0)
                  return (
                    <div key={i} className="clima-dia">
                      <div className="clima-dia-nombre">{i===0 ? t.hoy : t.dias[dt.getDay()]}</div>
                      <div style={{ fontSize:'0.75rem', color:'var(--texto-medio)', marginBottom:'0.4rem', fontWeight:600 }}>{dt.getDate()}/{dt.getMonth()+1}</div>
                      <div className="clima-icon-wrap">
                        <div className="clima-tooltip">{getDesc(d.weatherCodeMax, lang)}</div>
                        <div dangerouslySetInnerHTML={{ __html: getSvgIcono(d.weatherCodeMax, 44) }} />
                      </div>
                      <div className="clima-dia-temps">
                        <span style={{ color:'var(--texto)' }}>↑ {Math.round(d.temperatureMax)}°</span>
                        <span style={{ color:'var(--texto-suave)', fontWeight:400 }}>↓ {Math.round(d.temperatureMin)}°</span>
                      </div>
                      <div className="clima-dia-lluvia" dangerouslySetInnerHTML={{ __html: getParaguita(lluvia) }} />
                    </div>
                  )
                })}
              </div>
              <p style={{ textAlign:'center', fontSize:'0.72rem', color:'var(--texto-suave)', marginTop:'1.5rem', opacity:0.7 }}>{t.climaNote}</p>
            </>
          )
        })()}
      </div>
    </section>
  )
}

/* ── Info importante (acordeón) ── */
function getAcordItems(t) {
  return [
    {
      titulo: t.acordRes, destacado: false,
      icono: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 2v4M8 2v4M2 10h20"/></svg>,
      contenido: <div className="acord-grid"><div className="acord-dato"><span className="acord-label">{t.acordResL1}</span><span>{t.acordResV1}</span></div><div className="acord-dato"><span className="acord-label">{t.acordResL2}</span><span>{t.acordResV2}</span></div></div>,
    },
    {
      titulo: t.acordCancel, destacado: false,
      icono: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      contenido: <p dangerouslySetInnerHTML={{ __html: t.acordCancelTxt }} />,
    },
    {
      titulo: t.acordAc, destacado: true,
      icono: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>,
      contenido: <div className="acord-grid"><div className="acord-dato"><span className="acord-label">{t.acordAcL1}</span><span>{t.acordAcV1}</span></div><div className="acord-dato"><span className="acord-label">{t.acordAcL2}</span><span>{t.acordAcV2}</span></div></div>,
    },
    {
      titulo: t.acordHora, destacado: false,
      icono: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      contenido: <><div className="acord-grid"><div className="acord-dato"><span className="acord-label">{t.acordHoraL1}</span><span>{t.acordHoraV1}</span></div><div className="acord-dato"><span className="acord-label">{t.acordHoraL2}</span><span>{t.acordHoraV2}</span></div></div><p style={{ marginTop:'0.75rem', fontSize:'0.85rem', color:'var(--texto-suave)' }}>{t.acordHoraNote}</p></>,
    },
    {
      titulo: t.acordNormas, destacado: false,
      icono: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
      contenido: <div className="acord-grid"><div className="acord-dato"><span className="acord-label" style={{ color:'#4caf50' }}>{t.acordNormasSi}</span><span dangerouslySetInnerHTML={{ __html: t.acordNormasSiV }} /></div><div className="acord-dato"><span className="acord-label" style={{ color:'#e53935' }}>{t.acordNormasNo}</span><span dangerouslySetInnerHTML={{ __html: t.acordNormasNoV }} /></div></div>,
    },
    {
      titulo: t.acordGar, destacado: false,
      icono: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="12" y2="15"/></svg>,
      contenido: <><p>{t.acordGarIntro}</p><ul style={{ marginTop:'0.5rem', paddingLeft:'1.2rem', color:'var(--texto-medio)', fontSize:'0.88rem', lineHeight:2 }}><li>{t.acordGarLi1}</li><li>{t.acordGarLi2}</li><li>{t.acordGarLi3}</li></ul></>,
    },
    {
      titulo: t.acordPago, destacado: false,
      icono: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>,
      contenido: <div className="acord-grid" style={{ gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))' }}><div className="acord-dato"><span className="acord-label" style={{ whiteSpace:'nowrap' }}>{t.acordPagoL1}</span><span>{t.acordPagoV1}</span></div><div className="acord-dato"><span className="acord-label">{t.acordPagoL2}</span><span>{t.acordPagoV2}</span></div><div className="acord-dato"><span className="acord-label">{t.acordPagoL3}</span><span>{t.acordPagoV3}</span></div></div>,
    },
  ]
}

function SeccionInfo({ t }) {
  const [acordOpen, setAcordOpen] = useState(null)
  const toggle = i => setAcordOpen(prev => prev === i ? null : i)
  const items = getAcordItems(t)

  return (
    <section id="antes-de-reservar" className="sec-blanco" style={{ padding:'3rem 5% 4rem' }}>
      <div className="section-inner" style={{ maxWidth:860 }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <p className="section-label">{t.infoLabel}</p>
          <h2 className="section-title">{t.infoTitle}</h2>
          <div className="divider" style={{ margin:'0.9rem auto 0' }} />
        </div>
        <div className="acordeon">
          {items.map((item, i) => (
            <div key={i} className={`acord-item${item.destacado ? ' acord-destacado' : ''}`}>
              <button className={`acord-header${acordOpen === i ? ' open' : ''}`} onClick={() => toggle(i)}>
                <span>{item.icono}<span>{item.titulo}</span></span>
                <svg className="acord-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div className={`acord-body${acordOpen === i ? ' open' : ''}`}>{item.contenido}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:'2rem', paddingTop:'1.75rem', borderTop:'1px solid var(--borde)' }}>
          <p style={{ fontSize:'0.85rem', color:'var(--texto-suave)', marginBottom:'1rem' }}>{t.infoCta}</p>
          <a href={`https://wa.me/${WSP}?text=${encodeURIComponent('Hola! Leí la información importante y me gustaría consultar disponibilidad.')}`} target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'0.6rem', background:'#25D366', color:'#fff', textDecoration:'none', padding:'0.75rem 2rem', borderRadius:8, fontFamily:"'Nunito',sans-serif", fontSize:'0.85rem', fontWeight:700, letterSpacing:'0.04em', boxShadow:'0 4px 16px rgba(37,211,102,0.3)', transition:'transform 0.25s,box-shadow 0.25s' }}>
            <IconoWsp />{t.infoBtnWsp}
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Servicios ── */
function SeccionServicios({ t }) {
  const S = [
    { n:t.servPileta, d:t.servPiletaD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20M2 16c1.5 1.5 3.5 2 5 2s3.5-.5 5-2 3.5-2 5-2 3.5.5 5 2M7 12V7a5 5 0 0 1 10 0v5"/><circle cx="12" cy="4" r="1"/></svg> },
    { n:t.servParque, d:t.servParqueD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 12 8 9 8 5a4 4 0 0 1 8 0c0 4-4 7-4 7z"/><path d="M6 22v-4M6 18c0-2 2-4 2-4M18 22v-4M18 18c0-2-2-4-2-4"/></svg> },
    { n:t.servCochera, d:t.servCocheraD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="22" height="18" rx="2"/><path d="M1 9h22M5 3v6M19 3v6"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/><path d="M5 13h14l-1-4H6l-1 4z"/></svg> },
    { n:t.servAsadores, d:t.servAsadoresD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="7"/><path d="M5.5 6.5 12 13M12 13l6.5-6.5M12 6V2"/><path d="M9 22h6"/><path d="M12 20v2"/></svg> },
    { n:t.servDesayuno, d:t.servDesayunoD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg> },
    { n:t.servWifi, d:t.servWifiD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg> },
    { n:t.servAc, d:t.servAcD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="8" rx="2"/><path d="M7 11v4M12 11v4M17 11v4M5 19h14M7 15c0 2-1 4-2 4M17 15c0 2 1 4 2 4M12 15v4"/></svg> },
    { n:t.servLimpieza, d:t.servLimpiezaD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22v-4l9-9 4 4-9 9H3z"/><path d="m15 5 1.5-1.5a2.121 2.121 0 0 1 3 3L18 8l-3-3z"/><path d="M9.5 14.5 11 16"/></svg> },
    { n:t.servAlgarrobo, d:t.servAlgarroboD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 7 7 4 7 4s1 5 5 8M12 12c0-5 5-8 5-8s-1 5-5 8"/><path d="M8 22h8"/></svg> },
    { n:t.servJuegos, d:t.servJuegosD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/><path d="M8 12h8"/></svg> },
    { n:t.servSeguridad, d:t.servSeguridadD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    { n:t.servRopa, d:t.servRopaD, ico:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6l9 6 9-6M3 6v12l9 6 9-6V6"/></svg> },
  ]
  return (
    <section id="servicios" className="sec-crema-a">
      <div className="section-inner">
        <p className="section-label">{t.servLabel}</p>
        <h2 className="section-title">{t.servTitle}</h2>
        <div className="divider" />
        <div className="servicios-grid">
          {S.map((s, i) => (
            <div key={i} className="servicio-item">
              <div className="servicio-icon">{s.ico}</div>
              <p className="servicio-nombre">{s.n}</p>
              <p className="servicio-desc">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Carrusel ── */
function Carrusel({ fotos, id, disabled }) {
  const [pos, setPos] = useState(0)
  const total = fotos.length
  const mover = (dir, e) => { e.stopPropagation(); setPos(p => Math.max(0, Math.min(p+dir, total-1))) }
  const offset = total > 0 ? `${-(pos*100)/total}%` : '0%'
  return (
    <div className="card-carousel" id={id}>
      <div className="card-carousel-track" style={{ transform:`translateX(${offset})`, width:`${total*100}%` }}>
        {fotos.map((f,i) => <img key={i} src={f} alt="" style={{ width:`${100/total}%` }} loading={i===0?'eager':'lazy'} />)}
      </div>
      {!disabled && (
        <>
          <button className="card-arrow prev" onClick={e=>mover(-1,e)} disabled={pos===0} aria-label="Foto anterior">&#8249;</button>
          <button className="card-arrow next" onClick={e=>mover(1,e)} disabled={pos>=total-1} aria-label="Foto siguiente">&#8250;</button>
        </>
      )}
      <div className="card-dots">{fotos.map((_,i) => <div key={i} className={`card-dot${i===pos?' active':''}`}/>)}</div>
      <span className="card-counter">{pos+1} / {total}</span>
    </div>
  )
}

function IcoMeta({ tipo }) {
  const st = { display:'inline-block', verticalAlign:'middle', flexShrink:0 }
  if (tipo === 'personas')
    return <svg style={st} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  if (tipo === 'desayuno')
    return <svg style={st} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/></svg>
  if (tipo === 'habitaciones')
    return <svg style={st} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  if (tipo === 'cama' || tipo === 'camas')
    return <svg style={st} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>
  return null
}

function IconoWsp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

/* ── Card ── */
function CardAlojamiento({ item, destacado, noDisponible, sinBadge, wspUrl, t }) {
  return (
    <div className={`aloj-card disp-aloj-card${destacado?' disp-aloj-card--dest':''}${noDisponible?' disp-aloj-card--no':''}`}>
      <div className="card-img">
        <Carrusel fotos={item.fotos} id={`car-disp-${item.id}`} disabled={noDisponible} />
        {!sinBadge && (
          <span className={`disp-avail-badge${noDisponible?' disp-avail-badge--no':destacado?' disp-avail-badge--si':' disp-avail-badge--otro'}`}>
            {noDisponible ? t.badgeNo : t.badgeSi}
          </span>
        )}
        {!noDisponible && (
          <div className="card-hover-panel">
            <a className="btn-consultar-card" href={wspUrl} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}>{t.btnWsp}</a>
          </div>
        )}
      </div>
      <div className="card-body">
        <p className="card-name">{item.nombre}</p>
        <div className="card-meta">
          <span style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}><IcoMeta tipo={item.iconoMeta1} />{item.meta1}</span>
          <span style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}><IcoMeta tipo={item.iconoMeta2} />{item.meta2}</span>
        </div>
        <div className="card-features">{item.features.map(f => <span key={f} className="feature-tag">{f}</span>)}</div>
        {!noDisponible && item.unidadesDisponibles > 0 && (
          <p className="disp-unidades">{item.unidadesDisponibles === 1 ? `1 ${t.unidad}` : `${item.unidadesDisponibles} ${t.unidades}`}</p>
        )}
        <div style={{ flex: 1 }} />
        {!noDisponible && (
          <a className="disp-wsp-btn" href={wspUrl} target="_blank" rel="noopener noreferrer"><IconoWsp />{t.btnWsp}</a>
        )}
      </div>
    </div>
  )
}

/* ── Página principal ── */
export default function Disponibilidad() {
  const router = useRouter()
  const { fechaIngreso, fechaEgreso, cantidadPersonas, tipo } = router.query

  const [rawData, setRawData] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('es')
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)

  const t = I18N[lang] || I18N.es
  // resultados se recomputa con cada cambio de idioma sin re-fetch
  const resultados = rawData ? parsearRespuesta(rawData, t) : null

  useEffect(() => {
    function handler(e) { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false) }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    const params = new URLSearchParams()
    if (fechaIngreso) params.set('fechaIngreso', fechaIngreso)
    if (fechaEgreso) params.set('fechaEgreso', fechaEgreso)
    if (cantidadPersonas) params.set('cantidadPersonas', cantidadPersonas)
    if (tipo) params.set('tipo', tipo)
    fetch(`${API_URL}?${params}`)
      .then(r => { if (!r.ok) throw new Error(`Error ${r.status}`); return r.json() })
      .then(data => setRawData(data))
      .catch(e => setError(e.message))
      .finally(() => setCargando(false))
  }, [router.isReady])

  const buildWspUrl = item => {
    const msg = ['Hola! Me interesa consultar disponibilidad para:',`*${item.nombre}*`,`Ingreso: ${formatFecha(fechaIngreso)}`,`Egreso: ${formatFecha(fechaEgreso)}`,`Huéspedes: ${cantidadPersonas||'—'}`,'','¿Podría darme más información?'].join('\n')
    return `https://wa.me/${WSP}?text=${encodeURIComponent(msg)}`
  }

  const cantNoches = (fechaIngreso && fechaEgreso)
    ? Math.max(0, Math.round((new Date(fechaEgreso) - new Date(fechaIngreso)) / 86400000))
    : 0

  const esCualquiera = !tipo || normalizarTipo(tipo) === 'cualquiera'
  const disponiblesCoincidentes = (resultados||[]).filter(r => r.disponible && tipoCoincide(tipo, r.tipo))
  const disponiblesOtros        = (resultados||[]).filter(r => r.disponible && !esCualquiera && !tipoCoincide(tipo, r.tipo))
  const noDisponibles           = (resultados||[]).filter(r => !r.disponible)
  const hayResultados  = resultados && resultados.length > 0
  const hayDisponibles = disponiblesCoincidentes.length > 0 || disponiblesOtros.length > 0

  return (
    <>
      <Head>
        <title>Disponibilidad | Hotel y Cabañas Brisas de Oro</title>
        <meta name="description" content="Consulta de disponibilidad — Hotel y Cabañas Brisas de Oro, Villa Carlos Paz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* TOPBAR */}
      <div className="topbar" id="main-topbar">
        <div className="topbar-inner">
          <a className="topbar-dir" href="https://www.google.com/maps/search/Av.+Ram%C3%B3n+J.+C%C3%A1rcano+2590+Villa+Carlos+Paz+C%C3%B3rdoba+Argentina" target="_blank" rel="noopener noreferrer">
            <svg width="11" height="14" viewBox="0 0 11 14" fill="none" style={{ flexShrink:0, opacity:0.7 }}><path d="M5.5 0C2.46 0 0 2.46 0 5.5C0 9.625 5.5 14 5.5 14C5.5 14 11 9.625 11 5.5C11 2.46 8.54 0 5.5 0ZM5.5 7.5C4.395 7.5 3.5 6.605 3.5 5.5C3.5 4.395 4.395 3.5 5.5 3.5C6.605 3.5 7.5 4.395 7.5 5.5C7.5 6.606 6.605 7.5 5.5 7.5Z" fill="var(--oro)"/></svg>
            <span>Av. Ramón J. Cárcano 2590 · Villa Carlos Paz, Córdoba</span>
          </a>
        </div>
      </div>

      {/* NAV */}
      <nav id="main-nav" className="scrolled">
        <div className="nav-inner">
          <a href="/" className="logo"><img src="/logo.png" alt="Hotel y Cabañas Brisas de Oro" /></a>
          <ul className="nav-links">
            <li><a href="/#nosotros">{t.navNosotros}</a></li>
            <li><a href="/#alojamientos">{t.navAlojamientos}</a></li>
            <li><a href="/#antes-de-reservar">{t.navInfo}</a></li>
            <li><a href="/#servicios">{t.navServicios}</a></li>
            <li><a href="/#testimonios">{t.navTestimonios}</a></li>
            <li><a href="#clima" onClick={e => { e.preventDefault(); const el = document.getElementById('clima'); const nav = document.getElementById('main-nav'); const banner = document.querySelector('.disp-banner'); const offset = (nav?.offsetHeight ?? 84) + (banner?.offsetHeight ?? 0) + 8; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' }); }}>{t.navClima}</a></li>
            <li><a href="/#ubicacion">{t.navUbicacion}</a></li>
          </ul>
          <div className="nav-right">
            <div ref={langRef} className={`lang-selector${langOpen?' open':''}`} id="langSelector">
              <button className="lang-btn" onClick={() => setLangOpen(v=>!v)} aria-label="Seleccionar idioma">
                <span className="globe">🌐</span>
                <span id="current-lang">{lang.toUpperCase()}</span>
                <span className="chevron">▼</span>
              </button>
              <div className="lang-dropdown">
                <div className={`lang-option${lang==='es'?' active':''}`} onClick={() => { setLang('es'); setLangOpen(false) }}><span className="flag">ES</span> Español</div>
                <div className={`lang-option${lang==='en'?' active':''}`} onClick={() => { setLang('en'); setLangOpen(false) }}><span className="flag">EN</span> English</div>
                <div className={`lang-option${lang==='pt'?' active':''}`} onClick={() => { setLang('pt'); setLangOpen(false) }}><span className="flag">PT</span> Português</div>
              </div>
            </div>
            <a href={`https://wa.me/${WSP}?text=${encodeURIComponent('Hola! Me gustaría consultar disponibilidad y tarifas.')}`} className="nav-cta" target="_blank" rel="noopener noreferrer">{t.navCta}</a>
            <button className="nav-hamburger" onClick={() => setMenuOpen(v=>!v)} aria-label="Menú"><span/><span/><span/></button>
          </div>
        </div>
      </nav>

      {/* MENÚ MOBILE */}
      <nav className={`nav-mobile-menu${menuOpen?' open':''}`}>
        <a href="/#nosotros" onClick={() => setMenuOpen(false)}>{t.navNosotros}</a>
        <a href="/#alojamientos" onClick={() => setMenuOpen(false)}>{t.navAlojamientos}</a>
        <a href="/#antes-de-reservar" onClick={() => setMenuOpen(false)}>{t.navInfo}</a>
        <a href="/#servicios" onClick={() => setMenuOpen(false)}>{t.navServicios}</a>
        <a href="/#testimonios" onClick={() => setMenuOpen(false)}>{t.navTestimonios}</a>
        <a href="#clima" onClick={e => { e.preventDefault(); setMenuOpen(false); const el = document.getElementById('clima'); const nav = document.getElementById('main-nav'); const banner = document.querySelector('.disp-banner'); const offset = (nav?.offsetHeight ?? 84) + (banner?.offsetHeight ?? 0) + 8; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' }); }}>{t.navClima}</a>
        <a href="/#ubicacion" onClick={() => setMenuOpen(false)}>{t.navUbicacion}</a>
      </nav>

      {/* MAIN */}
      <main className="disp-main">

        {/* BANNER */}
        <div className="disp-banner">
          <div className="disp-banner-inner">
            <div className="disp-banner-datos">

              {/* Fila 1: Ingreso · Egreso · Estadía */}
              <div className="disp-banner-fila disp-banner-fila--1">
                <div className="disp-banner-item">
                  <span className="disp-banner-label">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {t.bannerIngreso}
                  </span>
                  <span className="disp-banner-valor">{formatFecha(fechaIngreso)}</span>
                  <span className="disp-banner-sub">Check-in · 14:00 hs</span>
                </div>
                <div className="disp-banner-sep" aria-hidden="true" />
                <div className="disp-banner-item">
                  <span className="disp-banner-label">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {t.bannerEgreso}
                  </span>
                  <span className="disp-banner-valor">{formatFecha(fechaEgreso)}</span>
                  <span className="disp-banner-sub">Check-out · 10:00 hs</span>
                </div>
                {cantNoches > 0 && (
                  <>
                    <div className="disp-banner-sep" aria-hidden="true" />
                    <div className="disp-banner-item">
                      <span className="disp-banner-label">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                        {t.bannerNochesLabel}
                      </span>
                      <span className="disp-banner-valor">{cantNoches} {cantNoches === 1 ? t.bannerNoche : t.bannerNoches}</span>
                    </div>
                  </>
                )}
              </div>
              <div className="disp-banner-sep" aria-hidden="true" />

              {/* Fila 2: Huéspedes · Tipo */}
              <div className="disp-banner-fila disp-banner-fila--2">
                <div className="disp-banner-item">
                  <span className="disp-banner-label">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    {t.bannerHuespedes}
                  </span>
                  <span className="disp-banner-valor">{cantidadPersonas || '—'}</span>
                </div>
                {!esCualquiera && tipo && (
                  <>
                    <div className="disp-banner-sep" aria-hidden="true" />
                    <div className="disp-banner-item">
                      <span className="disp-banner-label">{t.bannerTipo}</span>
                      <span className="disp-banner-valor">{etiquetaTipo(tipo, t)}</span>
                    </div>
                  </>
                )}
              </div>

            </div>
            <a href="/" className="disp-banner-btn">{t.bannerModificar}</a>
          </div>
        </div>

        {/* RESULTADOS */}
        <div className="disp-content">
          {cargando && (
            <div className="disp-estado"><div className="disp-spinner" /><p>{t.cargando}</p></div>
          )}
          {!cargando && error && (
            <div className="disp-estado disp-estado--error">
              <p className="disp-estado-icono">⚠</p>
              <p>{error}</p>
              <a href="/" className="disp-btn-volver">{t.volverIntentar}</a>
            </div>
          )}
          {!cargando && !error && resultados !== null && !hayResultados && (
            <div className="disp-estado">
              <p className="disp-estado-icono">🔍</p>
              <p>{t.sinResultados}</p>
              <a href="/" className="disp-btn-volver">{t.bannerModificar}</a>
            </div>
          )}
          {!cargando && !error && hayResultados && !hayDisponibles && (
            /* Ningún alojamiento disponible: mensaje + todas las cards funcionales */
            <section className="disp-seccion">
              <div style={{ textAlign:'center', padding:'1.5rem 0 2rem', borderBottom:'1px solid var(--borde)', marginBottom:'2rem' }}>
                <p style={{ fontSize:'1.26rem', fontWeight:700, color:'var(--texto)', marginBottom:'0.4rem' }}>{t.sinDispTitulo}</p>
                <p style={{ fontSize:'0.85rem', color:'var(--texto-suave)' }}>{t.sinDispSub}</p>
              </div>
              <div className="disp-grid">
                {(resultados||[]).map(r => (
                  <CardAlojamiento key={r.id} item={r} sinBadge wspUrl={buildWspUrl(r)} t={t} />
                ))}
              </div>
            </section>
          )}
          {!cargando && !error && hayResultados && hayDisponibles && (
            <>
              {disponiblesCoincidentes.length > 0 && (
                <section className="disp-seccion">
                  <h2 className="disp-seccion-titulo">
                    {esCualquiera ? t.dispDisponibles : `${t.dispTuSeleccion} · ${etiquetaTipo(tipo, t)}`}
                    <span className="disp-seccion-count">{disponiblesCoincidentes.length}</span>
                  </h2>
                  <div className="disp-grid">
                    {disponiblesCoincidentes.map(r => <CardAlojamiento key={r.id} item={r} destacado wspUrl={buildWspUrl(r)} t={t} />)}
                  </div>
                </section>
              )}
              {!esCualquiera && disponiblesOtros.length > 0 && (
                <section className="disp-seccion disp-seccion--sugerencias">
                  <h2 className="disp-seccion-titulo disp-seccion-titulo--gris">
                    {t.dispOtrasOpciones}
                    <span className="disp-seccion-count">{disponiblesOtros.length}</span>
                  </h2>
                  <div className="disp-grid">
                    {disponiblesOtros.map(r => <CardAlojamiento key={r.id} item={r} wspUrl={buildWspUrl(r)} t={t} />)}
                  </div>
                </section>
              )}
              {noDisponibles.length > 0 && (
                <section className="disp-seccion disp-seccion--no">
                  <h2 className="disp-seccion-titulo disp-seccion-titulo--no">
                    {t.dispNoDisponibles}
                    <span className="disp-seccion-count">{noDisponibles.length}</span>
                  </h2>
                  <div className="disp-grid">
                    {noDisponibles.map(r => <CardAlojamiento key={r.id} item={r} noDisponible wspUrl="" t={t} />)}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        {/* FRANJA — transición hacia información importante */}
        <div style={{ background:'var(--crema-b)', borderTop:'1px solid var(--borde)', borderBottom:'1px solid var(--borde)', padding:'1.25rem 5%', textAlign:'center' }}>
          <div
            onClick={() => {
              const target = document.getElementById('antes-de-reservar')
              const nav    = document.getElementById('main-nav')
              const banner = document.querySelector('.disp-banner')
              const offset = (nav?.offsetHeight ?? 84) + (banner?.offsetHeight ?? 0) + 12
              const top    = target.getBoundingClientRect().top + window.scrollY - offset
              window.scrollTo({ top, behavior: 'smooth' })
            }}
            style={{ display:'inline-flex', flexDirection:'column', alignItems:'center', gap:'0.5rem', color:'var(--texto-medio)', cursor:'pointer' }}
          >
            <span
              style={{ fontFamily:"'Nunito',sans-serif", fontSize:'0.82rem', fontWeight:600, letterSpacing:'0.03em' }}
              dangerouslySetInnerHTML={{ __html: t.franjaTexto }}
            />
            <svg className="bounce-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--oro)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        <SeccionInfo t={t} />
        <SeccionServicios t={t} />
        <SeccionClima lang={lang} />
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <p className="footer-logo">Hotel y Cabañas Brisas de Oro<span>Villa Carlos Paz · Córdoba · Argentina</span></p>
              <p className="footer-desc">{t.footerDesc}</p>
            </div>
            <div className="footer-col">
              <h4>{t.footerAloj}</h4>
              <ul>
                <li>{t.footerAloj1}</li><li>{t.footerAloj2}</li>
                <li>{t.footerAloj3}</li><li>{t.footerAloj4}</li><li>{t.footerAloj5}</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.footerInfo}</h4>
              <ul>
                <li>{t.footerCheckin}</li><li>{t.footerCheckout}</li>
                <li><a href="https://wa.me/543541548053" target="_blank" rel="noopener noreferrer">3541-548053</a></li>
                <li><a href="https://www.google.com/maps/search/Av.+Ram%C3%B3n+J.+C%C3%A1rcano+2590+Villa+Carlos+Paz" target="_blank" rel="noopener noreferrer">Av. Ramón J. Cárcano 2590</a></li>
                <li><a href="https://www.instagram.com/brisasdeoro" target="_blank" rel="noopener noreferrer">@brisasdeoro</a></li>
                <li><a href="mailto:brisasdeoro@gmail.com">brisasdeoro@gmail.com</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>{t.footerTambien}</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem' }}>
                <a className="platform-link dark" href="https://www.google.com/maps/search/Brisas+de+Oro+Hotel+y+Caba%C3%B1as+Villa+Carlos+Paz" target="_blank" rel="noopener noreferrer">Google Maps</a>
                <a className="platform-link dark" href="https://www.alquilerargentina.com/alojamientos/aw75-Caba%C3%B1a-Hotel-y-Caba%C3%B1as-Brisas-de-Oro-Villa-Carlos-Paz.html" target="_blank" rel="noopener noreferrer">Alquiler Argentina</a>
                <a className="platform-link dark" href="https://www.welcomeargentina.com/villacarlospaz/cabanas-brisas-de-oro.html" target="_blank" rel="noopener noreferrer">Welcome Argentina</a>
              </div>
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom" style={{ justifyContent:'center', textAlign:'center' }}>
            <p className="solo-desktop">{t.footerCopy}</p>
            <p className="solo-mobile">{t.footerCopyMobile}</p>
          </div>
        </div>
      </footer>

      <a className="wsp-float" href={`https://wa.me/${WSP}?text=${encodeURIComponent('Hola! Me gustaría consultar disponibilidad y tarifas.')}`} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </>
  )
}
