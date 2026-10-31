import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SITE_URL, LOCALES, SEO, HOTEL_SCHEMA, localePath, translateHtml } from '../lib/seo'

/* ===== TRADUCCIONES (también se usan en el servidor para renderizar /en y /pt) ===== */
const I18N = {
      es: {
        'alt.cchica':'Cabaña chica para hasta 3 personas en Brisas de Oro, Villa Carlos Paz',
        'alt.cmediana':'Cabaña mediana para 5 a 6 personas en Brisas de Oro, Villa Carlos Paz',
        'alt.cgrande':'Cabaña grande para 7 a 8 personas en Brisas de Oro, Villa Carlos Paz',
        'alt.hab':'Habitación de hotel en Brisas de Oro, Villa Carlos Paz',
        'alt.apart':'Apart hotel para hasta 5 personas en Brisas de Oro, Villa Carlos Paz',
        'alt.casa':'Casa con pileta en Icho Cruz para hasta 10 personas',
        'alt.familia':'Familia de huéspedes durante su estadía en Brisas de Oro',
        'alt.complejo':'Vista del complejo Brisas de Oro en Villa Carlos Paz',
        'alt.hero':'Hotel y Cabañas Brisas de Oro en Villa Carlos Paz, Córdoba',
        'sticky.btn':'Buscar',
        'topbar.dir':'Av. Ramón J. Cárcano 2590 · Villa Carlos Paz, Córdoba',
        'topbar.mail':'Escribinos','nav.nosotros':'Nosotros','nav.alojamientos':'Alojamientos','nav.servicios':'Servicios',
        'nav.testimonios':'Reseñas','nav.ubicacion':'Ubicación','nav.info':'Info importante','nav.clima':'Clima','nav.info':'Info importante','nav.clima':'Clima','nav.cta':'Consultar',
        'hero.eyebrow':'Hotel y Cabañas en Villa Carlos Paz',
        'hero.title':'Viví <em>momentos inolvidables</em>',
        'hero.desc':'Complejo familiar atendido por sus dueños, donde el trato personalizado y el clima hogareño hacen que cada huésped se sienta en casa. Rodeados de las sierras cordobesas y a orillas del río San Antonio, en Villa&nbsp;Carlos&nbsp;Paz.',
        'hero.descMobile':'Complejo familiar atendido por sus dueños, donde el trato personalizado y el clima hogareño hacen que cada huésped se sienta en casa. Rodeados de las sierras cordobesas y a orillas del río San Antonio, en Villa&nbsp;Carlos&nbsp;Paz.',
        'hero.b1':'Ambiente familiar','hero.b2':'Desayuno buffet','hero.b3':'Pileta','hero.b4':'Pet friendly',
        'widget.title':'Consultar disponibilidad','widget.sub':'Encontrá tu espacio ideal y contactanos para confirmar',
        'widget.llegada':'Llegada','widget.salida':'Salida','widget.huespedes':'Huéspedes','widget.tipo':'Tipo de alojamiento',
        'widget.cualquiera':'Todos los alojamientos','widget.cabana':'Cabaña','widget.habitacion':'Habitación','widget.apart':'Apart Hotel',
        'widget.btn':'Ver disponibilidad','widget.note.a':'Sin pagos online','widget.note.b':'Confirmamos directamente por WhatsApp',
        'nosotros.label':'Quiénes somos','nosotros.title':'Un lugar donde cada huésped es parte de la familia',
        'nosotros.badge1':'Atendido por sus dueños','nosotros.badge2':'María Celia, anfitriona',
        'nosotros.p1':'Somos un complejo familiar ubicado en Villa Carlos Paz, atendido directamente por sus dueños. Desde el primer contacto hasta el momento de la despedida, nos ocupamos personalmente de que tu estadía sea cómoda, tranquila y especial.',
        'nosotros.p2':'Cada detalle importa: el desayuno casero preparado con amor, el saludo al llegar, la charla de tarde. Son esas pequeñas cosas las que hacen que nuestros huéspedes se vayan con una sonrisa y quieran volver.',
        'nosotros.quote':'<span class="cita-linea">"Más que una estadía, un recuerdo</span><span class="cita-linea">que se lleva en el corazón."</span>',
        'nosotros.c1':'Atención personalizada','nosotros.c2':'Ubicación estratégica','nosotros.c3':'Flexibilidad y comodidad','nosotros.c4':'16 unidades','nosotros.c5':'Atendido por la familia','nosotros.c6':'El Algarrobo','nosotros.p3':'En el corazón del complejo se encuentra El Algarrobo — nuestro espacio compartido bajo la sombra de un algarrobo bicentenario. Parrilleros, mesas y el sonido de la naturaleza, para que cada reunión sea un momento especial.',
        'galeria.vermas':'Ver más<br>fotos','galeria.cta':'Consultanos →',
        'aloj.label':'Nuestros alojamientos','aloj.title':'Encontrá tu espacio ideal','aloj.consultar':'Consultar',
        'aloj.tipo1':'Cabaña chica','aloj.tipo2':'Cabaña mediana','aloj.tipo3':'Cabaña grande','aloj.tipo4':'Hotel','aloj.tipo5':'Apart Hotel',
        'aloj.card1.name':'Cabaña chica','aloj.card1.meta1':'Hasta 3 personas','aloj.card1.meta2':'1 dormitorio',
        'aloj.card2.name':'Cabaña mediana','aloj.card2.meta1':'Hasta 5/6 personas','aloj.card2.meta2':'1 dormitorio',
        'aloj.card3.name':'Cabaña grande','aloj.card3.meta1':'Hasta 7/8 personas','aloj.card3.meta2':'2 dormitorios',
        'aloj.card4.name':'Habitaciones de hotel','aloj.card4.meta1':'1–4 personas',
        'aloj.card4.v1':'Doble','aloj.card4.v2':'Triple','aloj.card4.v3':'Cuádruple','aloj.card4.body2':'Baño privado',
        'aloj.card5.name':'Apart Hotel','aloj.card5.meta1':'Hasta 4/5 personas','aloj.card5.body2':'2 hab. con baño privado',
        'feat.frio':'Aire frío/calor','feat.minicocina':'Mini cocina equipada','feat.desayuno.opc':'Desayuno opcional','feat.cocina':'Cocina equipada','feat.ac':'Aire acondicionado','feat.limp3':'Limpieza c/3 días',
        'feat.ac24':'Aire frío/calor 24 hs','feat.limp1':'Limpieza diaria',
        'feat.asador.priv':'Asador privado','feat.salamandra':'Salamandra','feat.heladera':'Heladera privada','feat.asador.comp':'Asador compartido',
        'widget.tipo.abbr':'Alojamiento','widget.cualquiera.short':'Todos','widget.tipo.short':'Tipo','hero.b1.abbr':'Familiar',
        'serv.label':'Lo que ofrecemos','serv.title':'Nuestros servicios',
        'serv.pileta':'Pileta','serv.pileta.d':'Compartida para todos los huéspedes','serv.parque':'Parque','serv.parque.d':'Amplio y verde',
        'serv.cochera':'Cochera','serv.cochera.d':'Techada y segura','serv.asadores':'Asadores','serv.asadores.d':'Privado en cada cabaña',
        'serv.desayuno':'Desayuno buffet','serv.desayuno.d':'Casero, de Celia','serv.wifi.d':'Todo el complejo',
        'serv.ac':'Aire acond.','serv.ac.d':'Frío y calor','serv.limpieza':'Limpieza','serv.limpieza.d':'Servicio de mucamas','serv.algarrobo':'El Algarrobo','serv.algarrobo.d':'Espacio compartido bicentenario','serv.juegos':'Juegos para niños','serv.juegos.d':'Para jugar y divertirse en familia','serv.seguridad':'Seguridad','serv.seguridad.d':'Rejas, alarma y cámaras','serv.ropa':'Ropa blanca','serv.ropa.d':'Sábanas, toallas y toallones',
        'test.label':'Reseñas','test.title':'Lo que dicen quienes <span class="titulo-corte">nos visitaron</span>',
        'test.rating':'Reseñas verificadas · Google y Alquiler Argentina',
        'test.r1':'"Las cabañas son cómodas, el predio es grande. Es atendida por sus dueños, super amables."',
        'test.r2':'"Un lugar hermoso, para ir caminando a Playas de Oro. Las cabañas con vista a la pileta, muy cómodas. El desayuno casero de Celia: 10 puntos. Volveríamos sin dudas."',
        'test.r3':'"Excelente atención del personal, siempre dispuesto a ayudar. El complejo está muy bien cuidado y la ubicación es ideal para disfrutar las sierras."',
        'test.r4':'"Fuimos con toda la familia y quedamos encantados. Los chicos disfrutaron muchísimo la pileta y el parque. Sin dudas volvemos el año que viene."',
        'test.r5':'"La cabaña estaba impecable, bien equipada y muy cómoda. El trato de los dueños hace la diferencia — te sentís en casa desde que llegás."',
        'test.r6':'"Hermoso lugar, tranquilo y a pasos del río. El desayuno buffet es lo mejor — casero y abundante. Lo recomiendo a todos los que quieran descansar de verdad."',
        'test.r7':'"Muy buena experiencia. El lugar limpio, ordenado y la atención personalizada. Se nota que los dueños disfrutan recibir a la gente."',
        'test.r8':'"Primera vez que íbamos y ya queremos volver. El río está a dos pasos, la pileta genial y la atención del complejo es increíble. ¡100% recomendable!"',
        'test.r9':'"El desayuno de Celia no tiene comparación. Rico, abundante y con mucho cariño. El resto del complejo está a la misma altura: impecable."',
        'test.r10':'"Lugar tranquilo, verde y bien ubicado. La cabaña tenía todo lo necesario y el trato fue siempre excelente. Volvemos seguro."',
        'ubic.label':'Dónde estamos','ubic.title':'En plena avenida, rodeados de naturaleza',
        'ubic.desc':'Ubicados sobre una de las avenidas principales de Villa Carlos Paz, con las sierras como horizonte y&nbsp;el&nbsp;río a pocos pasos.',
        'ubic.d1a':'1 cuadra','ubic.d1b':'Balneario Playas de Oro','ubic.d2a':'Al lado','ubic.d2b':'Río San Antonio',
        'ubic.d3a':'25 cuadras · 2,5 km','ubic.d3b':'Centro de Villa Carlos Paz','ubic.d4a':'45 minutos','ubic.d4b':'Aeropuerto Internacional de Córdoba',
        'ubic.mapa':'Google Maps — próximamente',
        'cta.title':'¿Listo para reservar tus vacaciones?','cta.sub':'Escribinos directo por WhatsApp <span class="cta-linea">y te respondemos al instante.</span>','cta.btn':'Consultar por WhatsApp',
        'footer.desc':'Complejo familiar atendido por sus dueños, donde el trato personalizado y el clima hogareño hacen que cada huésped se sienta en casa. Rodeados de las sierras cordobesas y a orillas del río San Antonio.',
        'footer.aloj':'Alojamientos','footer.a1':'Cabaña chica (hasta 3 pers.)','footer.a2':'Cabaña mediana (hasta 6 pers.)','footer.a3':'Cabaña grande (hasta 8 pers.)','footer.a4':'Habitaciones de hotel',
        'footer.info':'Información','footer.checkin':'Check-in: 13:00 hs','footer.checkout':'Check-out: 10:00 hs','footer.host':'Brisas de Oro · Villa Carlos Paz',
        'fam.label':'Nuestras familias','fam.title':'<span class="fam-title-line">Cada despedida</span> <span class="fam-title-line">es un hasta pronto</span>','fam.desc':'Las familias que nos eligieron son parte de nuestra historia. Cada visita deja una huella que nos hace querer seguir dando lo mejor.',
        'casa.label':'Nuestra casa','casa.title':'También es tu casa','casa.desc':'Cada rincón fue pensado para que te sientas cómodo, libre y en familia.<br>Bienvenido a Brisas de Oro.',
        'test.plat':'También nos encontrás en','footer.tambien':'También en',
        'aloj.franja':'¿Te interesa algún alojamiento? Antes de consultar, te recomendamos leer la <span style="color:var(--oro);font-weight:700;">información importante</span>',
        'info.cta.btn':'Consultar por WhatsApp',
        'info.label':'Información importante','info.title':'Antes de reservar, leé esto',
        'info.cta.note':'¿Ya leíste toda la información? Escribinos y te respondemos a la brevedad.',
        'acord.res.title':'Condiciones de reserva',
        'acord.res.l1':'Seña','acord.res.v1':'50% anticipado para confirmar la reserva · El saldo restante se abona al ingreso',
        'acord.res.l2':'Estadía mínima','acord.res.v2':'Variable según temporada — consultanos por disponibilidad',
        'acord.cancel.title':'Política de cancelación',
        'acord.cancel.txt':'<strong>Cancelación flexible — seña reutilizable.</strong> Ante la cancelación del huésped, el importe abonado como seña se asignará como crédito en pesos para utilizar en una futura reserva. Debe realizarse dentro de los 6 meses siguientes y estará sujeta a disponibilidad.',
        'acord.ac.title':'Aire acondicionado — importante',
        'acord.ac.l1':'Cabañas','acord.ac.v1':'Habilitado de 12:00 a 17:00 hs incluido en la tarifa. Fuera de ese horario tiene un costo adicional — consultanos al reservar.',
        'acord.ac.l2':'Habitaciones y Apart Hotel','acord.ac.v2':'Aire acondicionado disponible las 24 hs sin cargo adicional.',
        'acord.hora.title':'Horarios de ingreso y egreso',
        'acord.hora.l1':'Check-in','acord.hora.v1':'A partir de las 13:00 hs',
        'acord.hora.l2':'Check-out','acord.hora.v2':'Hasta las 10:00 hs',
        'acord.hora.note':'Los horarios son flexibles según disponibilidad. Consultanos si necesitás un horario especial.',
        'acord.normas.title':'Normas del alojamiento',
        'acord.normas.si':'✓ Se acepta',
        'acord.normas.si.v':'Familias · Parejas · Grupos de jóvenes · Niños · Bebés · Personas con movilidad reducida · Mascotas <em>(solo en cabañas)</em> · Visitas <em>(con costo adicional en temporada alta)</em>',
        'acord.normas.no':'✗ No se permite',
        'acord.normas.no.v':'Fumar en espacios interiores · Fiestas · Música alta · Ingreso de personas no registradas en la reserva',
        'acord.gar.title':'Política de garantía',
        'acord.gar.intro':'Se solicita al momento del ingreso:',
        'acord.gar.li1':'DNI o Pasaporte del titular de la reserva y de todos los integrantes del grupo',
        'acord.gar.li2':'Completar la planilla de ingreso con datos personales',
        'acord.gar.li3':'Firma de contrato de locación temporal',
        'acord.pago.title':'Formas de pago',
        'acord.pago.l1':'Transferencia','acord.pago.v1':'CBU, CVU o Alias disponible al confirmar la reserva (bancos y billeteras virtuales)',
        'acord.pago.l2':'Tarjeta de crédito / débito','acord.pago.v2':'Aceptamos tarjetas. Las tarjetas de crédito tienen recargo según la cantidad de cuotas. Consultar al reservar.',
        'acord.pago.l3':'Efectivo','acord.pago.v3':'Pesos argentinos y dólares',
        'clima.label':'Villa Carlos Paz · Sierras de Córdoba','clima.title':'Clima para tu viaje',
        'clima.desc':'Consultá el pronóstico antes de preparar tu equipaje. Datos en tiempo real, actualizados automáticamente.',
        'clima.note':'Datos provistos por Tomorrow.io · Actualizado automáticamente',
        'footer.a5':'Apart Hotel',
        'topbar.dir.short':'Av. Ramón J. Cárcano 2590','topbar.casa':'Casa con Pileta · Icho Cruz','topbar.casa.short':'Casa · Icho Cruz',
        'widget.casa':'Casa','widget.huesp.ph':'Huésp.','widget.huesp.val':'huésp.','widget.listo':'Listo','widget.menos':'Menos huéspedes','widget.mas':'Más huéspedes',
        'aloj.tipo6':'Casa · Icho Cruz',
        'aloj.card6.name':'Casa con Pileta · Icho Cruz','aloj.card6.meta1':'Hasta 10 personas','aloj.card6.meta2':'3 dormitorios',
        'aloj.card6.noincluye.a':'Sin desayuno ni toallas','aloj.card6.noincluye.b':'Ropa de cama opcional (con cargo adicional)','aloj.card6.ubic':'Icho Cruz — a 15 min de Brisas de Oro',
        'feat.pileta.priv':'Pileta privada','feat.parque.priv':'Parque privado','feat.wifi.tv':'Wi-Fi y DirecTV','feat.pet':'Pet friendly',
        'ubic.casa.title':'Casa con Pileta · Icho Cruz','ubic.casa.sub':'Alojamiento independiente, fuera del complejo Brisas de Oro.',
        'ubic.casa.dir':'Calle Uruguay esq. Lombardo, Icho Cruz',
        'ubic.casa.d1a':'15 min (9 km)','ubic.casa.d1b':'Brisas de Oro','ubic.casa.d2a':'20 min (13 km)','ubic.casa.d2b':'Centro de Villa Carlos Paz',
        'ubic.casa.d3a':'22 min (13,5 km)','ubic.casa.d3b':'Terminal de ómnibus de Carlos Paz','ubic.casa.d4a':'1 h (57 km)','ubic.casa.d4b':'Aeropuerto de Córdoba',
        'ubic.casa.btn':'Cómo llegar',
        'footer.a6':'Casa con Pileta · Icho Cruz (hasta 10 pers.)','footer.casa.dir':'Uruguay esq. Lombardo, Icho Cruz',
        'acord.hora.casa':'Casa con Pileta · Icho Cruz: check-in 14:00 hs · check-out 10:00 hs',
        'acord.casa.title':'Casa con Pileta · Icho Cruz',
        'acord.casa.intro':'Rigen las mismas condiciones de reserva, cancelación, formas de pago y normas que en Brisas de Oro. Lo propio de la casa:',
        'acord.casa.l1':'Horarios','acord.casa.v1':'Check-in 14:00 hs · Check-out 10:00 hs',
        'acord.casa.l2':'Incluye','acord.casa.v2':'Pileta privada, parque privado, asador privado bajo alero, cocina equipada, Wi-Fi y DirecTV, ventiladores. Pet friendly.',
        'acord.casa.l3':'No incluye','acord.casa.v3':'Desayuno ni toallas. Ropa de cama opcional, con cargo adicional.',
        'acord.casa.l4':'Capacidad','acord.casa.v4':'<span class="nowrap">Hasta 10 personas ·</span> <span class="nowrap">3 dormitorios ·</span><br class="br-movil"> <span class="nowrap">2 baños</span>',
        'acord.casa.l5':'Dirección','acord.casa.v5':'<span class="nowrap">Calle Uruguay,</span> <span class="nowrap">esquina Lombardo,</span><br class="br-movil"> <span class="nowrap">Icho Cruz</span>',
        'serv.sub':'Servicios disponibles en <span class="serv-sub-nombre">Brisas de Oro Hotel y Cabañas.</span>',
        'test.casa.tag':'Casa · Icho Cruz','test.plat.casa':'Reseñas de la Casa en Google',
        'test.r11':'"Un lugar fantástico, para disfrutar en familia!!! Ubicación muy cómoda para salir para cualquier lado!! Río cerca, y barrio súper tranquilo!!"',
        'test.r12':'"Muy lindo lugar, tranquilo, mucha paz, muy cerca del río y de calle principal donde se puede comprar todo lo necesario. Excelente atención de los dueños."',
        'test.r13':'"Excelente lugar tranquilo para disfrutar en familia. El río, el centro, la gente, lo recomiendo."',
      },
      en: {
        'alt.cchica':'Small cabin for up to 3 guests at Brisas de Oro, Villa Carlos Paz',
        'alt.cmediana':'Medium cabin for 5 to 6 guests at Brisas de Oro, Villa Carlos Paz',
        'alt.cgrande':'Large cabin for 7 to 8 guests at Brisas de Oro, Villa Carlos Paz',
        'alt.hab':'Hotel room at Brisas de Oro, Villa Carlos Paz',
        'alt.apart':'Apart hotel for up to 5 guests at Brisas de Oro, Villa Carlos Paz',
        'alt.casa':'House with pool in Icho Cruz for up to 10 guests',
        'alt.familia':'Guest family during their stay at Brisas de Oro',
        'alt.complejo':'View of the Brisas de Oro complex in Villa Carlos Paz',
        'alt.hero':'Brisas de Oro Hotel & Cabins in Villa Carlos Paz, Córdoba',
        'sticky.btn':'Search',
        'topbar.dir':'Av. Ramón J. Cárcano 2590 · Villa Carlos Paz, Córdoba',
        'topbar.mail':'Email us','nav.nosotros':'About us','nav.alojamientos':'Accommodations','nav.servicios':'Services',
        'nav.testimonios':'Reviews','nav.ubicacion':'Location','nav.info':'Important info','nav.clima':'Weather','nav.cta':'Inquire',
        'hero.eyebrow':'Hotel&nbsp;&amp;&nbsp;Cabins in Villa Carlos Paz',
        'hero.title':'Live <em>unforgettable moments</em>',
        'hero.desc':'A family-run resort managed by its owners, where personalized attention and a homely atmosphere make every guest feel at home. Surrounded by the Córdoba mountains and on the banks of the San Antonio River, in Villa&nbsp;Carlos&nbsp;Paz.',
        'hero.descMobile':'A family-run resort managed by its owners, where personalized attention and a homely atmosphere make every guest feel at home. Surrounded by the Córdoba mountains and on the banks of the San Antonio River, in Villa&nbsp;Carlos&nbsp;Paz.',
        'hero.b1':'Family atmosphere','hero.b2':'Buffet breakfast','hero.b3':'Pool','hero.b4':'Pet friendly',
        'widget.title':'Check availability','widget.sub':'Fill in the details and we\'ll reply on WhatsApp',
        'widget.llegada':'Check-in','widget.salida':'Check-out','widget.huespedes':'Guests','widget.tipo':'Lodging type',
        'widget.cualquiera':'All accommodations','widget.cabana':'Cabin','widget.habitacion':'Room','widget.apart':'Apart Hotel',
        'widget.btn':'Check availability','widget.note.a':'No online payments','widget.note.b':'Direct confirmation via WhatsApp',
        'nosotros.label':'About us','nosotros.title':'A place where every guest becomes part of the family',
        'nosotros.badge1':'Owner-managed','nosotros.badge2':'María Celia, host',
        'nosotros.p1':'We are a family-run resort in Villa Carlos Paz, managed directly by its owners. From the first contact to the moment of farewell, we personally make sure your stay is comfortable, peaceful and special.',
        'nosotros.p2':'Every detail matters: the homemade breakfast prepared with love, the warm welcome, the afternoon conversations. It\'s those small things that make our guests leave with a smile and want to come back.',
        'nosotros.quote':'<span class="cita-linea">"More than a stay, a memory</span><span class="cita-linea">you carry in your heart."</span>',
        'nosotros.c1':'Personalized attention','nosotros.c2':'Strategic location','nosotros.c3':'Flexibility & comfort','nosotros.c4':'16 units','nosotros.c5':'Family-run','nosotros.c6':'El Algarrobo','nosotros.p3':'At the heart of the complex stands El Algarrobo — our shared space beneath the shade of a 200-year-old algarrobo tree. Grills, tables and the sounds of nature, for gatherings that become special moments.',
        'galeria.vermas':'See more<br>photos','galeria.cta':'Contact us →',
        'aloj.label':'Our accommodations','aloj.title':'Find your ideal space','aloj.consultar':'Inquire',
        'aloj.tipo1':'Small cabin','aloj.tipo2':'Medium cabin','aloj.tipo3':'Large cabin','aloj.tipo4':'Hotel','aloj.tipo5':'Apart Hotel',
        'aloj.card1.name':'Small cabin','aloj.card1.meta1':'Up to 3 guests','aloj.card1.meta2':'1 bedroom',
        'aloj.card2.name':'Medium cabin','aloj.card2.meta1':'Up to 5/6 guests','aloj.card2.meta2':'1 bedroom',
        'aloj.card3.name':'Large cabin','aloj.card3.meta1':'Up to 7/8 guests','aloj.card3.meta2':'2 bedrooms',
        'aloj.card4.name':'Hotel rooms','aloj.card4.meta1':'1–4 guests',
        'aloj.card4.v1':'Double','aloj.card4.v2':'Triple','aloj.card4.v3':'Quadruple','aloj.card4.body2':'Private bathroom',
        'aloj.card5.name':'Apart Hotel','aloj.card5.meta1':'Up to 4/5 guests','aloj.card5.body2':'2 rooms with private bathroom',
        'feat.frio':'Heat/cool A/C','feat.minicocina':'Kitchenette','feat.desayuno.opc':'Optional breakfast','feat.cocina':'Full kitchen','feat.ac':'Air conditioning','feat.limp3':'Cleaning every 3 days',
        'feat.ac24':'Air conditioning (heat/cool) 24h','feat.limp1':'Daily cleaning',
        'feat.asador.priv':'Private BBQ','feat.salamandra':'Wood stove','feat.heladera':'Private fridge','feat.asador.comp':'Shared BBQ',
        'widget.tipo.abbr':'Lodging','widget.cualquiera.short':'All','widget.tipo.short':'Type','hero.b1.abbr':'Family',
        'serv.label':'What we offer','serv.title':'Our services',
        'serv.pileta':'Pool','serv.pileta.d':'Shared by all guests','serv.parque':'Grounds','serv.parque.d':'Spacious and green',
        'serv.cochera':'Parking','serv.cochera.d':'Covered and secure','serv.asadores':'BBQ grills','serv.asadores.d':'Private BBQ per cabin',
        'serv.desayuno':'Buffet breakfast','serv.desayuno.d':'Homemade, by Celia','serv.wifi.d':'Throughout the resort',
        'serv.ac':'Air cond.','serv.ac.d':'Hot & cold','serv.limpieza':'Housekeeping','serv.limpieza.d':'Daily maid service','serv.algarrobo':'El Algarrobo','serv.algarrobo.d':'Shared bicentennial space','serv.juegos':'Kids playground','serv.juegos.d':'Play and fun for everyone','serv.seguridad':'Security','serv.seguridad.d':'Fences, alarm & cameras','serv.ropa':'Bed & bath linen','serv.ropa.d':'Sheets, towels and bath towels',
        'test.label':'What our guests say','test.title':'Real reviews <span class="titulo-corte">from the resort</span>',
        'test.rating':'Verified reviews · Google & Alquiler Argentina',
        'test.r1':'"The cabins are comfortable, the grounds are spacious. Owner-run, super friendly."',
        'test.r2':'"A beautiful place, walking distance to the beach. Cabins with pool views, very comfortable. Celia\'s homemade breakfast: 10/10. We\'d definitely come back."',
        'test.r3':'"Excellent service from the staff, always ready to help. The resort is very well kept and the location is perfect for enjoying the mountains."',
        'test.r4':'"We went with the whole family and loved it. The kids had a great time at the pool and the grounds. We will definitely be back next year."',
        'test.r5':'"The cabin was spotless, well-equipped and very comfortable. The owners make all the difference — you feel at home from the moment you arrive."',
        'test.r6':'"Beautiful, peaceful place, steps from the river. The buffet breakfast is the highlight — homemade and generous. I recommend it to anyone looking for a real rest."',
        'test.r7':'"Very good experience. The place is clean, tidy and the service is personal. You can tell the owners love having guests."',
        'test.r8':'"First time visiting and we already want to come back. The river is steps away, the pool is great and the service is wonderful. 100% recommended!"',
        'test.r9':'"Celia\'s breakfast is unmatched. Delicious, generous and made with love. The rest of the resort is at the same level: spotless."',
        'test.r10':'"Peaceful, green and well-located. The cabin had everything we needed and the service was always excellent. We\'ll definitely be back."',
        'ubic.label':'Where we are','ubic.title':'On the main avenue, surrounded by nature',
        'ubic.desc':'Located on one of the main avenues of Villa Carlos Paz, with the mountains on the horizon and&nbsp;the&nbsp;river just steps away.',
        'ubic.d1a':'1 block','ubic.d1b':'Playas de Oro beach','ubic.d2a':'Next door','ubic.d2b':'San Antonio River',
        'ubic.d3a':'25 blocks · 2.5 km','ubic.d3b':'Villa Carlos Paz city center','ubic.d4a':'45 minutes','ubic.d4b':'Córdoba International Airport',
        'ubic.mapa':'Google Maps — coming soon',
        'cta.title':'Ready to book your vacation?','cta.sub':'Write us directly on WhatsApp <span class="cta-linea">and we\'ll reply instantly.</span>','cta.btn':'Contact us on WhatsApp',
        'footer.desc':'Family resort run by its owners, one block from Playas de Oro beach. The warmth you always wanted, in the heart of the Córdoba mountains.',
        'footer.aloj':'Accommodations','footer.a1':'Small cabin (up to 3 guests)','footer.a2':'Medium cabin (up to 6 guests)','footer.a3':'Large cabin (up to 8 guests)','footer.a4':'Hotel rooms',
        'footer.info':'Information','footer.checkin':'Check-in: 1:00 PM','footer.checkout':'Check-out: 10:00 AM','footer.host':'Brisas de Oro · Villa Carlos Paz',
        'info.label':'Important information','info.title':'Before booking, read this',
        'info.cta.note':'Already read everything? Write to us and we will get back to you shortly.',
        'acord.res.title':'Booking conditions',
        'acord.res.l1':'Deposit','acord.res.v1':'50% advance payment to confirm the booking · Remaining balance due at check-in',
        'acord.res.l2':'Minimum stay','acord.res.v2':'Varies by season — contact us for availability',
        'acord.cancel.title':'Cancellation policy',
        'acord.cancel.txt':'<strong>Flexible cancellation — reusable deposit.</strong> If the guest cancels, the deposit paid will be assigned as a credit in pesos to be used for a future booking. Must be made within the following 6 months and is subject to availability.',
        'acord.ac.title':'Air conditioning — important',
        'acord.ac.l1':'Cabins','acord.ac.v1':'Available from 12:00 to 17:00 included in the rate. Outside those hours an additional charge applies — ask us when booking.',
        'acord.ac.l2':'Rooms & Apart Hotel','acord.ac.v2':'Air conditioning available 24 hours at no extra charge.',
        'acord.hora.title':'Check-in and check-out times',
        'acord.hora.l1':'Check-in','acord.hora.v1':'From 13:00 hs',
        'acord.hora.l2':'Check-out','acord.hora.v2':'Until 10:00 hs',
        'acord.hora.note':'Times are flexible depending on availability. Contact us if you need a special schedule.',
        'acord.normas.title':'House rules',
        'acord.normas.si':'✓ Allowed',
        'acord.normas.si.v':'Families · Couples · Groups of young people · Children · Babies · Persons with reduced mobility · Pets <em>(cabins only)</em> · Visitors <em>(extra charge during high season)</em>',
        'acord.normas.no':'✗ Not allowed',
        'acord.normas.no.v':'Smoking indoors · Parties · Loud music · Unregistered guests',
        'acord.gar.title':'Security policy',
        'acord.gar.intro':'Required at check-in:',
        'acord.gar.li1':'National ID or Passport of the booking holder and all group members',
        'acord.gar.li2':'Fill in the check-in form with personal details',
        'acord.gar.li3':'Sign the temporary rental agreement',
        'acord.pago.title':'Payment methods',
        'acord.pago.l1':'Bank transfer','acord.pago.v1':'CBU, CVU or Alias provided upon booking confirmation (banks and digital wallets)',
        'acord.pago.l2':'Credit / debit card','acord.pago.v2':'We accept cards. Credit cards carry a surcharge depending on the number of installments. Ask when booking.',
        'acord.pago.l3':'Cash','acord.pago.v3':'Argentine pesos and US dollars',
        'clima.label':'Villa Carlos Paz · Córdoba Hills','clima.title':'Weather for your trip',
        'clima.desc':'Check the forecast before packing. Real-time data, updated automatically.',
        'clima.note':'Data provided by Tomorrow.io · Updated automatically',
        'fam.label':'Our families','fam.title':'<span class="fam-title-line">Every goodbye</span> <span class="fam-title-line">is a see you soon</span>','fam.desc':'The families who chose us are part of our story. Every visit leaves a mark that makes us want to keep giving our best.',
        'casa.label':'Our place','casa.title':'It is your home too','casa.desc':'Every corner was designed for you to feel comfortable, free and with your family.<br>Welcome to Brisas de Oro.',
        'test.plat':'Also find us on','footer.tambien':'Also on',
        'aloj.franja':'Interested in an accommodation? Before inquiring, we recommend reading the <span style="color:var(--oro);font-weight:700;">important information</span>',
        'info.cta.btn':'Contact us on WhatsApp',
        'footer.a5':'Apart Hotel',
        'topbar.dir.short':'Av. Ramón J. Cárcano 2590','topbar.casa':'House with Pool · Icho Cruz','topbar.casa.short':'House · Icho Cruz',
        'widget.casa':'House','widget.huesp.ph':'Guests','widget.huesp.val':'guests','widget.listo':'Done','widget.menos':'Fewer guests','widget.mas':'More guests',
        'aloj.tipo6':'House · Icho Cruz',
        'aloj.card6.name':'House with Pool · Icho Cruz','aloj.card6.meta1':'Up to 10 guests','aloj.card6.meta2':'3 bedrooms',
        'aloj.card6.noincluye.a':'No breakfast or towels','aloj.card6.noincluye.b':'Bed linen optional (extra charge)','aloj.card6.ubic':'Icho Cruz — 15 min from Brisas de Oro',
        'feat.pileta.priv':'Private pool','feat.parque.priv':'Private garden','feat.wifi.tv':'Wi-Fi & DirecTV','feat.pet':'Pet friendly',
        'ubic.casa.title':'House with Pool · Icho Cruz','ubic.casa.sub':'Independent accommodation, outside the Brisas de Oro resort.',
        'ubic.casa.dir':'Calle Uruguay & Lombardo, Icho Cruz',
        'ubic.casa.d1a':'15 min (9 km)','ubic.casa.d1b':'Brisas de Oro','ubic.casa.d2a':'20 min (13 km)','ubic.casa.d2b':'Villa Carlos Paz city center',
        'ubic.casa.d3a':'22 min (13.5 km)','ubic.casa.d3b':'Carlos Paz bus terminal','ubic.casa.d4a':'1 h (57 km)','ubic.casa.d4b':'Córdoba Airport',
        'ubic.casa.btn':'Get directions',
        'footer.a6':'House with Pool · Icho Cruz (up to 10 guests)','footer.casa.dir':'Uruguay & Lombardo, Icho Cruz',
        'acord.hora.casa':'House with Pool · Icho Cruz: check-in 14:00 hs · check-out 10:00 hs',
        'acord.casa.title':'House with Pool · Icho Cruz',
        'acord.casa.intro':'The same booking, cancellation, payment and house rules as at Brisas de Oro apply. Specific to the house:',
        'acord.casa.l1':'Times','acord.casa.v1':'Check-in 14:00 hs · Check-out 10:00 hs',
        'acord.casa.l2':'Includes','acord.casa.v2':'Private pool, private garden, private covered BBQ, full kitchen, Wi-Fi & DirecTV, fans. Pet friendly.',
        'acord.casa.l3':'Not included','acord.casa.v3':'Breakfast or towels. Bed linen optional, at an extra charge.',
        'acord.casa.l4':'Capacity','acord.casa.v4':'<span class="nowrap">Up to 10 guests ·</span> <span class="nowrap">3 bedrooms ·</span><br class="br-movil"> <span class="nowrap">2 bathrooms</span>',
        'acord.casa.l5':'Address','acord.casa.v5':'<span class="nowrap">Calle Uruguay</span> <span class="nowrap">&amp; Lombardo,</span><br class="br-movil"> <span class="nowrap">Icho Cruz</span>',
        'serv.sub':'Services available at <span class="serv-sub-nombre">Brisas de Oro Hotel y Cabañas.</span>',
        'test.casa.tag':'House · Icho Cruz','test.plat.casa':'House reviews on Google',
        'test.r11':'"A fantastic place to enjoy with the family!!! Very convenient location to head out anywhere!! River nearby, and a super quiet neighborhood!!"',
        'test.r12':'"Very nice place, quiet, very peaceful, very close to the river and to the main street where you can buy everything you need. Excellent service from the owners."',
        'test.r13':'"Excellent quiet place to enjoy with the family. The river, the town center, the people — I recommend it."',
      },
      pt: {
        'alt.cchica':'Cabana pequena para até 3 pessoas no Brisas de Oro, Villa Carlos Paz',
        'alt.cmediana':'Cabana média para 5 a 6 pessoas no Brisas de Oro, Villa Carlos Paz',
        'alt.cgrande':'Cabana grande para 7 a 8 pessoas no Brisas de Oro, Villa Carlos Paz',
        'alt.hab':'Quarto de hotel no Brisas de Oro, Villa Carlos Paz',
        'alt.apart':'Apart hotel para até 5 pessoas no Brisas de Oro, Villa Carlos Paz',
        'alt.casa':'Casa com piscina em Icho Cruz para até 10 pessoas',
        'alt.familia':'Família de hóspedes durante a estadia no Brisas de Oro',
        'alt.complejo':'Vista do complexo Brisas de Oro em Villa Carlos Paz',
        'alt.hero':'Hotel e Cabanas Brisas de Oro em Villa Carlos Paz, Córdoba',
        'sticky.btn':'Buscar',
        'topbar.dir':'Av. Ramón J. Cárcano 2590 · Villa Carlos Paz, Córdoba',
        'topbar.mail':'Escreva-nos','nav.nosotros':'Sobre nós','nav.alojamientos':'Hospedagem','nav.servicios':'Serviços',
        'nav.testimonios':'Avaliações','nav.ubicacion':'Localização','nav.info':'Info importante','nav.clima':'Clima','nav.info':'Info importante','nav.clima':'Clima','nav.cta':'Consultar',
        'hero.eyebrow':'Hotel e Cabanas em Villa Carlos Paz',
        'hero.title':'Viva <em>momentos inesquecíveis</em>',
        'hero.desc':'Complexo familiar gerenciado pelos proprietários, onde o atendimento personalizado e o clima acolhedor fazem cada hóspede se sentir em casa. Rodeados pelas serras cordobesas e às margens do Rio San Antonio, em Villa&nbsp;Carlos&nbsp;Paz.',
        'hero.descMobile':'Complexo familiar gerenciado pelos proprietários, onde o atendimento personalizado e o clima acolhedor fazem cada hóspede se sentir em casa. Rodeados pelas serras cordobesas e às margens do Rio San Antonio, em Villa&nbsp;Carlos&nbsp;Paz.',
        'hero.b1':'Ambiente familiar','hero.b2':'Café da manhã buffet','hero.b3':'Piscina','hero.b4':'Pet friendly',
        'widget.title':'Consultar disponibilidade','widget.sub':'Preencha os dados e respondemos pelo WhatsApp',
        'widget.llegada':'Chegada','widget.salida':'Saída','widget.huespedes':'Hóspedes','widget.tipo':'Tipo de acomodação',
        'widget.cualquiera':'Todos os alojamentos','widget.cabana':'Chalé','widget.habitacion':'Quarto','widget.apart':'Apart Hotel',
        'widget.btn':'Ver disponibilidade','widget.note.a':'Sem pagamentos online','widget.note.b':'Confirmação direta via WhatsApp',
        'nosotros.label':'Quem somos','nosotros.title':'Um lugar onde cada hóspede faz parte da família',
        'nosotros.badge1':'Gerenciado pelos proprietários','nosotros.badge2':'María Celia, anfitriã',
        'nosotros.p1':'Somos um complexo familiar localizado em Villa Carlos Paz, gerenciado diretamente pelos proprietários. Desde o primeiro contato até o momento da despedida, cuidamos pessoalmente para que sua estadia seja confortável, tranquila e especial.',
        'nosotros.p2':'Cada detalhe importa: o café da manhã caseiro preparado com amor, a recepção calorosa, as conversas de fim de tarde. São essas pequenas coisas que fazem nossos hóspedes partirem com um sorriso e quererem voltar.',
        'nosotros.quote':'<span class="cita-linea">"Mais do que uma estadia,</span><span class="cita-linea">uma lembrança que fica no coração."</span>',
        'nosotros.c1':'Atenção personalizada','nosotros.c2':'Localização estratégica','nosotros.c3':'Flexibilidade e conforto','nosotros.c4':'16 unidades','nosotros.c5':'Atendido pela família','nosotros.c6':'El Algarrobo','nosotros.p3':'No coração do complexo está El Algarrobo — nosso espaço compartilhado sob a sombra de um algarrobo bicentenário. Churrasqueiras, mesas e os sons da natureza, para que cada reunião seja um momento especial.',
        'galeria.vermas':'Ver mais<br>fotos','galeria.cta':'Fale conosco →',
        'aloj.label':'Nossa hospedagem','aloj.title':'Encontre seu espaço ideal','aloj.consultar':'Consultar',
        'aloj.tipo1':'Chalé pequeno','aloj.tipo2':'Chalé médio','aloj.tipo3':'Chalé grande','aloj.tipo4':'Hotel','aloj.tipo5':'Apart Hotel',
        'aloj.card1.name':'Chalé pequeno','aloj.card1.meta1':'Até 3 pessoas','aloj.card1.meta2':'1 quarto',
        'aloj.card2.name':'Chalé médio','aloj.card2.meta1':'Até 5/6 pessoas','aloj.card2.meta2':'1 quarto',
        'aloj.card3.name':'Chalé grande','aloj.card3.meta1':'Até 7/8 pessoas','aloj.card3.meta2':'2 quartos',
        'aloj.card4.name':'Quartos de hotel','aloj.card4.meta1':'1–4 pessoas',
        'aloj.card4.v1':'Duplo','aloj.card4.v2':'Triplo','aloj.card4.v3':'Quádruplo','aloj.card4.body2':'Banheiro privativo',
        'aloj.card5.name':'Apart Hotel','aloj.card5.meta1':'Até 4/5 pessoas','aloj.card5.body2':'2 quartos c/ banheiro privado',
        'feat.frio':'A/C frio e calor','feat.minicocina':'Minicozinha equipada','feat.desayuno.opc':'Café da manhã opcional','feat.cocina':'Cozinha equipada','feat.ac':'Ar-condicionado','feat.limp3':'Limpeza a cada 3 dias',
        'feat.ac24':'Ar-condicionado frio/calor 24h','feat.limp1':'Limpeza diária',
        'feat.asador.priv':'Churrasqueira privativa','feat.salamandra':'Salamandra','feat.heladera':'Geladeira privada','feat.asador.comp':'Churrasqueira compartilhada',
        'widget.tipo.abbr':'Alojamento','widget.cualquiera.short':'Todos','widget.tipo.short':'Tipo','hero.b1.abbr':'Familiar',
        'serv.label':'O que oferecemos','serv.title':'Nossos serviços',
        'serv.pileta':'Piscina','serv.pileta.d':'Compartilhada por todos os hóspedes','serv.parque':'Jardim','serv.parque.d':'Amplo e verde',
        'serv.cochera':'Estacionamento','serv.cochera.d':'Coberto e seguro','serv.asadores':'Churrasqueiras','serv.asadores.d':'Privativo em cada chalé',
        'serv.desayuno':'Café buffet','serv.desayuno.d':'Caseiro, da Celia','serv.wifi.d':'Em todo o complexo',
        'serv.ac':'Ar-cond.','serv.ac.d':'Frio e calor','serv.limpieza':'Limpeza','serv.limpieza.d':'Serviço de camareira','serv.algarrobo':'El Algarrobo','serv.algarrobo.d':'Espaço compartilhado bicentenário','serv.juegos':'Brinquedos','serv.juegos.d':'Diversão para toda a família','serv.seguridad':'Segurança','serv.seguridad.d':'Grades, alarme e câmeras','serv.ropa':'Roupa de cama e banho','serv.ropa.d':'Lençóis, toalhas e toalhões',
        'test.label':'O que dizem nossos hóspedes','test.title':'O que dizem <span class="titulo-corte">os nossos hóspedes</span>',
        'test.rating':'Avaliações verificadas · Google e Alquiler Argentina',
        'test.r1':'"Os chalés são confortáveis, o terreno é grande. É gerenciado pelos proprietários, super simpáticos."',
        'test.r2':'"Um lugar lindo, para ir caminhando até a praia. Chalés com vista para a piscina, muito confortáveis. O café da manhã da Celia: nota 10. Voltaríamos com certeza."',
        'test.r3':'"Atendimento excelente da equipe, sempre disposta a ajudar. O complexo é muito bem cuidado e a localização é ideal para aproveitar as serras."',
        'test.r4':'"Fomos com toda a família e adoramos. As crianças aproveitaram muito a piscina e o jardim. Sem dúvida voltamos no ano que vem."',
        'test.r5':'"O chalé estava impecável, bem equipado e muito confortável. O tratamento dos donos faz toda a diferença — você se sente em casa desde que chega."',
        'test.r6':'"Lugar lindo, tranquilo e a passos do rio. O café buffet é o melhor — caseiro e abundante. Recomendo a todos que queiram descansar de verdade."',
        'test.r7':'"Muito boa experiência. O lugar limpo, organizado e o atendimento personalizado. Dá para ver que os donos adoram receber as pessoas."',
        'test.r8':'"Primeira vez que fomos e já queremos voltar. O rio fica a dois passos, a piscina é ótima e o atendimento é incrível. 100% recomendado!"',
        'test.r9':'"O café da manhã da Celia não tem comparação. Gostoso, abundante e feito com muito carinho. O resto do complexo está na mesma altura: impecável."',
        'test.r10':'"Lugar tranquilo, verde e bem localizado. O chalé tinha tudo o que precisávamos e o atendimento foi sempre excelente. Voltamos com certeza."',
        'ubic.label':'Onde estamos','ubic.title':'Na avenida principal, rodeados de natureza',
        'ubic.desc':'Localizados em uma das avenidas principais de Villa Carlos Paz, com as serras no horizonte e&nbsp;o&nbsp;rio a poucos passos.',
        'ubic.d1a':'1 quarteirão','ubic.d1b':'Praia Playas de Oro','ubic.d2a':'Ao lado','ubic.d2b':'Rio San Antonio',
        'ubic.d3a':'25 quarteirões · 2,5 km','ubic.d3b':'Centro de Villa Carlos Paz','ubic.d4a':'45 minutos','ubic.d4b':'Aeroporto Internacional de Córdoba',
        'ubic.mapa':'Google Maps — em breve',
        'cta.title':'Pronto para reservar suas férias?','cta.sub':'Escreva para nós pelo WhatsApp <span class="cta-linea">e respondemos na hora.</span>','cta.btn':'Consultar pelo WhatsApp',
        'footer.desc':'Complexo familiar gerenciado pelos proprietários, onde o atendimento personalizado e o clima acolhedor fazem cada hóspede se sentir em casa. Rodeados pelas serras cordobesas e às margens do Rio San Antonio.',
        'footer.aloj':'Hospedagem','footer.a1':'Chalé pequeno (até 3 pessoas)','footer.a2':'Chalé médio (até 6 pessoas)','footer.a3':'Chalé grande (até 8 pessoas)','footer.a4':'Quartos de hotel',
        'footer.info':'Informações','footer.checkin':'Check-in: 13:00 hs','footer.checkout':'Check-out: 10:00 hs','footer.host':'Brisas de Oro · Villa Carlos Paz',
        'info.label':'Informações importantes','info.title':'Antes de reservar, leia isto',
        'info.cta.note':'Já leu todas as informações? Escreva para nós e responderemos em breve.',
        'acord.res.title':'Condições de reserva',
        'acord.res.l1':'Sinal','acord.res.v1':'50% antecipado para confirmar a reserva · O saldo restante é pago na chegada',
        'acord.res.l2':'Estadia mínima','acord.res.v2':'Varia conforme a temporada — consulte disponibilidade',
        'acord.cancel.title':'Política de cancelamento',
        'acord.cancel.txt':'<strong>Cancelamento flexível — sinal reutilizável.</strong> Em caso de cancelamento pelo hóspede, o valor pago como sinal será convertido em crédito em pesos para uso em uma futura reserva. Deve ser realizado dentro dos 6 meses seguintes e estará sujeito à disponibilidade.',
        'acord.ac.title':'Ar-condicionado — importante',
        'acord.ac.l1':'Chalés','acord.ac.v1':'Disponível das 12:00 às 17:00 incluído na tarifa. Fora desse horário tem custo adicional — consulte ao reservar.',
        'acord.ac.l2':'Quartos e Apart Hotel','acord.ac.v2':'Ar-condicionado disponível 24 horas sem custo adicional.',
        'acord.hora.title':'Horários de entrada e saída',
        'acord.hora.l1':'Check-in','acord.hora.v1':'A partir das 13:00 hs',
        'acord.hora.l2':'Check-out','acord.hora.v2':'Até as 10:00 hs',
        'acord.hora.note':'Os horários são flexíveis conforme disponibilidade. Consulte-nos se precisar de um horário especial.',
        'acord.normas.title':'Regras do alojamento',
        'acord.normas.si':'✓ Permitido',
        'acord.normas.si.v':'Famílias · Casais · Grupos de jovens · Crianças · Bebês · Pessoas com mobilidade reduzida · Animais de estimação <em>(apenas nos chalés)</em> · Visitas <em>(custo adicional na alta temporada)</em>',
        'acord.normas.no':'✗ Não permitido',
        'acord.normas.no.v':'Fumar em espaços internos · Festas · Música alta · Entrada de pessoas não registradas na reserva',
        'acord.gar.title':'Política de garantia',
        'acord.gar.intro':'Solicitado no momento do check-in:',
        'acord.gar.li1':'RG, CPF ou Passaporte do titular da reserva e de todos os integrantes do grupo',
        'acord.gar.li2':'Preencher a ficha de entrada com dados pessoais',
        'acord.gar.li3':'Assinar o contrato de locação temporária',
        'acord.pago.title':'Formas de pagamento',
        'acord.pago.l1':'Transferência','acord.pago.v1':'CBU, CVU ou Alias disponível ao confirmar a reserva (bancos e carteiras digitais)',
        'acord.pago.l2':'Cartão de crédito / débito','acord.pago.v2':'Aceitamos cartões. Cartões de crédito têm acréscimo conforme o número de parcelas. Consulte ao reservar.',
        'acord.pago.l3':'Dinheiro','acord.pago.v3':'Pesos argentinos e dólares americanos',
        'clima.label':'Villa Carlos Paz · Serras de Córdoba','clima.title':'Clima para a sua viagem',
        'clima.desc':'Confira a previsão antes de fazer as malas. Dados em tempo real, atualizados automaticamente.',
        'clima.note':'Dados fornecidos por Tomorrow.io · Atualizado automaticamente',
        'fam.label':'Nossas famílias','fam.title':'<span class="fam-title-line">Cada despedida</span> <span class="fam-title-line">é um até logo</span>','fam.desc':'As famílias que nos escolheram fazem parte da nossa história. Cada visita deixa uma marca que nos faz querer continuar dando o nosso melhor.',
        'casa.label':'Nossa casa','casa.title':'É a sua casa também','casa.desc':'Cada canto foi pensado para que você se sinta confortável, livre e em família.<br>Bem-vindo ao Brisas de Oro.',
        'test.plat':'Também nos encontre em','footer.tambien':'Também em',
        'aloj.franja':'Tem interesse em alguma acomodação? Antes de consultar, recomendamos ler as <span style="color:var(--oro);font-weight:700;">informações importantes</span>',
        'info.cta.btn':'Consultar pelo WhatsApp',
        'footer.a5':'Apart Hotel',
        'topbar.dir.short':'Av. Ramón J. Cárcano 2590','topbar.casa':'Casa com Piscina · Icho Cruz','topbar.casa.short':'Casa · Icho Cruz',
        'widget.casa':'Casa','widget.huesp.ph':'Hósp.','widget.huesp.val':'hósp.','widget.listo':'Pronto','widget.menos':'Menos hóspedes','widget.mas':'Mais hóspedes',
        'aloj.tipo6':'Casa · Icho Cruz',
        'aloj.card6.name':'Casa com Piscina · Icho Cruz','aloj.card6.meta1':'Até 10 pessoas','aloj.card6.meta2':'3 quartos',
        'aloj.card6.noincluye.a':'Sem café da manhã nem toalhas','aloj.card6.noincluye.b':'Roupa de cama opcional (com custo adicional)','aloj.card6.ubic':'Icho Cruz — a 15 min do Brisas de Oro',
        'feat.pileta.priv':'Piscina privativa','feat.parque.priv':'Jardim privativo','feat.wifi.tv':'Wi-Fi e DirecTV','feat.pet':'Pet friendly',
        'ubic.casa.title':'Casa com Piscina · Icho Cruz','ubic.casa.sub':'Hospedagem independente, fora do complexo Brisas de Oro.',
        'ubic.casa.dir':'Calle Uruguay esq. Lombardo, Icho Cruz',
        'ubic.casa.d1a':'15 min (9 km)','ubic.casa.d1b':'Brisas de Oro','ubic.casa.d2a':'20 min (13 km)','ubic.casa.d2b':'Centro de Villa Carlos Paz',
        'ubic.casa.d3a':'22 min (13,5 km)','ubic.casa.d3b':'Rodoviária de Carlos Paz','ubic.casa.d4a':'1 h (57 km)','ubic.casa.d4b':'Aeroporto de Córdoba',
        'ubic.casa.btn':'Como chegar',
        'footer.a6':'Casa com Piscina · Icho Cruz (até 10 pessoas)','footer.casa.dir':'Uruguay esq. Lombardo, Icho Cruz',
        'acord.hora.casa':'Casa com Piscina · Icho Cruz: check-in 14:00 hs · check-out 10:00 hs',
        'acord.casa.title':'Casa com Piscina · Icho Cruz',
        'acord.casa.intro':'Valem as mesmas condições de reserva, cancelamento, formas de pagamento e regras do Brisas de Oro. O que é próprio da casa:',
        'acord.casa.l1':'Horários','acord.casa.v1':'Check-in 14:00 hs · Check-out 10:00 hs',
        'acord.casa.l2':'Inclui','acord.casa.v2':'Piscina privativa, jardim privativo, churrasqueira privativa coberta, cozinha equipada, Wi-Fi e DirecTV, ventiladores. Pet friendly.',
        'acord.casa.l3':'Não inclui','acord.casa.v3':'Café da manhã nem toalhas. Roupa de cama opcional, com custo adicional.',
        'acord.casa.l4':'Capacidade','acord.casa.v4':'<span class="nowrap">Até 10 pessoas ·</span> <span class="nowrap">3 quartos ·</span><br class="br-movil"> <span class="nowrap">2 banheiros</span>',
        'acord.casa.l5':'Endereço','acord.casa.v5':'<span class="nowrap">Calle Uruguay,</span> <span class="nowrap">esquina Lombardo,</span><br class="br-movil"> <span class="nowrap">Icho Cruz</span>',
        'serv.sub':'Serviços disponíveis no <span class="serv-sub-nombre">Brisas de Oro Hotel y Cabañas.</span>',
        'test.casa.tag':'Casa · Icho Cruz','test.plat.casa':'Avaliações da Casa no Google',
        'test.r11':'"Um lugar fantástico para curtir em família!!! Localização muito prática para sair para qualquer lado!! Rio perto e bairro super tranquilo!!"',
        'test.r12':'"Lugar muito bonito, tranquilo, muita paz, muito perto do rio e da rua principal onde dá para comprar tudo o que precisa. Excelente atendimento dos donos."',
        'test.r13':'"Excelente lugar tranquilo para curtir em família. O rio, o centro, as pessoas, eu recomendo."',
      }
};

export default function Home() {
  const { locale } = useRouter()
  const lang = LOCALES.includes(locale) ? locale : 'es'
  const seo = SEO[lang]
  const pageLang = lang

  useEffect(() => {
    const i18n = I18N;
    
    let currentLang = pageLang;
    
    function applyTranslations(lang) {
      const t = i18n[lang];
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.innerHTML = t[key];
      });
      document.querySelectorAll('[data-i18n-opt]').forEach(el => {
        const key = el.getAttribute('data-i18n-opt');
        if (t[key] !== undefined) el.textContent = t[key];
      });
      document.querySelectorAll('[data-abbr-mobile-i18n]').forEach(el => {
        const key = el.getAttribute('data-abbr-mobile-i18n');
        if (t[key] !== undefined) el.setAttribute('data-abbr-mobile', t[key]);
      });
      const _tipoLabel = document.getElementById('tipo-aloj-label');
      const _tipoActive = document.querySelector('#tipo-aloj-opts .custom-tipo-opt.active');
      if (_tipoLabel && _tipoActive) _tipoLabel.textContent = _tipoActive.textContent;
      const _sTipoLabel = document.getElementById('s-tipo-label');
      const _sTipoActive = document.querySelector('#s-tipo-opts .custom-tipo-opt.active');
      if (_sTipoLabel && _sTipoActive) _sTipoLabel.textContent = _sTipoActive.textContent;
      document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (t[key] !== undefined) el.placeholder = t[key];
      });
      document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const key = el.getAttribute('data-i18n-alt');
        if (t[key] !== undefined) el.setAttribute('alt', t[key]);
      });
      document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
      });
      const _badges = document.querySelector('.hero-badges');
      if (_badges) _badges.classList.toggle('hero-badges--es', lang === 'es');
      document.body.classList.toggle('lang-pt', lang === 'pt');
      document.getElementById('current-lang').textContent = lang.toUpperCase();
      document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.textContent.trim().toLowerCase().startsWith(lang === 'es' ? 'esp' : lang === 'en' ? 'eng' : 'port') ||
            opt.querySelector('.flag')?.textContent === (lang === 'es' ? 'ES' : lang === 'en' ? 'EN' : 'PT')) {
          opt.classList.add('active');
        }
      });
      currentLang = lang;
      actualizarEtiquetaHuespedes();
    }
    
    function setLang(lang) {
      applyTranslations(lang);
      document.getElementById('langSelector').classList.remove('open');
      // Reflejar el idioma en la URL (/, /en, /pt) y en <html lang>, sin recargar
      document.documentElement.lang = lang;
      document.title = SEO[lang].title;
      try {
        window.history.replaceState(window.history.state, '', localePath(lang) + window.location.search + window.location.hash);
      } catch (e) {}
      // Refrescar clima en el idioma nuevo
      if (window.fetchClima) window.fetchClima();
    }
    
    function toggleLang() {
      document.getElementById('langSelector').classList.toggle('open');
    }
    
    // Cerrar dropdown si se hace clic fuera
    document.addEventListener('click', e => {
      if (!e.target.closest('#langSelector')) {
        document.getElementById('langSelector').classList.remove('open');
      }
    });
    
    /* ===== CARRUSEL TESTIMONIOS ===== */
    (function() {
      let posicion = 0;
      const GAP_REM = 1;
    
      // Columnas visibles según ancho de pantalla
      function getVisibles() {
        const w = window.innerWidth;
        if (w <= 768)  return 1;
        if (w <= 1024) return 2;
        return 4;
      }
    
      function igualAlturas() {
        const track = document.getElementById('testTrack');
        if (!track) return;
        const cols = Array.from(track.querySelectorAll('.test-col'));
        if (!cols.length) return;
        const vis = getVisibles();
        // En mobile solo hay 1 card visible por col, no igualar alturas
        if (vis === 1) {
          cols.forEach(col => col.querySelectorAll('.test-card').forEach(c => c.style.height = ''));
          return;
        }
        cols.forEach(col => col.querySelectorAll('.test-card').forEach(c => c.style.height = ''));
        const filas = 2;
        for (let f = 0; f < filas; f++) {
          // La columna de una sola reseña no entra en la igualación por filas: su tarjeta ocupa toda la columna
          const cardsEnFila = cols.filter(col => !col.classList.contains('test-col--una')).map(col => col.querySelectorAll('.test-card')[f]).filter(Boolean);
          const maxH = Math.max(...cardsEnFila.map(c => c.getBoundingClientRect().height));
          cardsEnFila.forEach(c => c.style.height = maxH + 'px');
        }
      }
    
      function initCarrusel() {
        const track    = document.getElementById('testTrack');
        const viewport = document.getElementById('testViewport');
        if (!track || !viewport) return;
    
        const cols  = track.querySelectorAll('.test-col');
        const total = cols.length;
    
        track.style.transition = 'transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)';
    
        function getMaxPos() {
          const vis = getVisibles();
          return Math.max(0, total - vis);
        }
    
        function aplicarTranslate(animado) {
          const maxP = getMaxPos();
          if (posicion > maxP) posicion = maxP;
          if (!animado) track.style.transition = 'none';
          else track.style.transition = 'transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)';
          const colW = cols[0].getBoundingClientRect().width;
          const gap  = parseFloat(getComputedStyle(document.documentElement).fontSize) * GAP_REM;
          track.style.transform = `translateX(-${posicion * (colW + gap)}px)`;
        }
    
        function actualizarBotones() {
          const prev = document.getElementById('test-prev');
          const next = document.getElementById('test-next');
          if (prev) prev.disabled = posicion === 0;
          if (next) next.disabled = posicion >= getMaxPos();
        }
    
        window.moverCarrusel = function(dir) {
          posicion = Math.max(0, Math.min(posicion + dir, getMaxPos()));
          aplicarTranslate(true);
          actualizarBotones();
        };
    
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            posicion = 0; // resetear posición al cambiar tamaño
            igualAlturas();
            aplicarTranslate(false);
            actualizarBotones();
            setTimeout(() => { track.style.transition = 'transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)'; }, 60);
          }, 80);
        });
    
        actualizarBotones();
        igualAlturas();
      }
    
        requestAnimationFrame(() => requestAnimationFrame(initCarrusel));
    })();
    /* ===== ACORDEÓN ===== */
    function toggleAcord(btn) {
      const body = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');
      btn.classList.toggle('open', !isOpen);
      body.classList.toggle('open', !isOpen);
    }
    
    /* ===== CARRUSEL FAMILIAS ===== */
    (function() {
      const TOTAL = 6;
      let posFam = 0;
    
      function getVisFam() { return window.innerWidth <= 768 ? 1 : 3; }
      function getMaxFam() { return Math.max(0, TOTAL - getVisFam()); }
    
      function initFamilias() {
        const track = document.getElementById('fam-track');
        const dots  = document.getElementById('fam-dots');
        if (!track) return;
        if (dots) {
          dots.innerHTML = '';
          const pags = Math.ceil(TOTAL / getVisFam());
          for (let i = 0; i < pags; i++) {
            const d = document.createElement('div');
            d.className = 'familias-dot' + (i === 0 ? ' active' : '');
            d.onclick = () => { posFam = Math.min(i * getVisFam(), getMaxFam()); aplicarFamilias(); };
            dots.appendChild(d);
          }
        }
        aplicarFamilias();
      }
    
      function aplicarFamilias(animado = true) {
        const track = document.getElementById('fam-track');
        if (!track) return;
        const slides = track.querySelectorAll('.familia-slide');
        if (!slides.length) return;
        let slideW = slides[0].getBoundingClientRect().width;
        if (!slideW) {
          const vp = document.getElementById('fam-viewport') || track.parentElement;
          slideW = (vp.getBoundingClientRect().width - 64) / getVisFam();
        }
        const gap = parseFloat(getComputedStyle(track).gap) || 32;
        track.style.transition = animado ? 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none';
        track.style.transform = `translateX(-${posFam * (slideW + gap)}px)`;
        const prev = document.getElementById('fam-prev');
        const next = document.getElementById('fam-next');
        if (prev) prev.disabled = posFam === 0;
        if (next) next.disabled = posFam >= getMaxFam();
        const pagAct = Math.floor(posFam / getVisFam());
        document.querySelectorAll('#fam-dots .familias-dot').forEach((d, i) => d.classList.toggle('active', i === pagAct));
      }
    
      window.moverFamilias = function(dir) {
        posFam = Math.max(0, Math.min(posFam + dir, getMaxFam()));
        aplicarFamilias();
      };
    
      let rTimer;
      window.addEventListener('resize', () => {
        clearTimeout(rTimer);
        rTimer = setTimeout(() => { posFam = 0; aplicarFamilias(false); }, 80);
      });
    
      requestAnimationFrame(() => requestAnimationFrame(initFamilias));
    })();
    
    /* ===== MENÚ HAMBURGUESA ===== */
    function isMobile() { return window.innerWidth <= 768; }
    
    function toggleMenu() {
      document.getElementById('nav-mobile-menu').classList.toggle('open');
    }
    function cerrarMenu() {
      document.getElementById('nav-mobile-menu').classList.remove('open');
    }
    function scrollToId(id) {
      var el = document.getElementById(id);
      if (!el) return;
      var topbar = document.getElementById('main-topbar');
      var nav    = document.getElementById('main-nav');
      var sticky = document.getElementById('stickyBar');
      var stickyH = (sticky && sticky.offsetHeight > 0) ? sticky.offsetHeight : 0;
      var offset = (topbar ? topbar.offsetHeight : 36) + (nav ? nav.offsetHeight : 84) + stickyH - 65;
      var top    = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
    window.addEventListener('load', function() {
      if (window.location.hash) {
        var id = window.location.hash.slice(1);
        setTimeout(function() { scrollToId(id); }, 80);
      }
    });
    
    function ajustarNav() {
      const ham   = document.getElementById('nav-hamburger');
      const links = document.querySelector('.nav-links');
      const menu  = document.getElementById('nav-mobile-menu');
      const topH  = document.getElementById('main-topbar');
      if (isMobile()) {
        ham.style.display   = 'flex';
        links.style.display = 'none';
        // Posicionar menú mobile debajo del nav
        const navH = document.getElementById('main-nav').offsetHeight;
        const topbarH = (topH && topH.style.transform !== 'translateY(-100%)') ? 36 : 0;
        menu.style.top = (topbarH + navH) + 'px';
      } else {
        ham.style.display   = 'none';
        links.style.display = 'flex';
        menu.classList.remove('open');
      }
    }
    window.addEventListener('resize', ajustarNav);
    ajustarNav();
    
    /* ===== GALERÍA PRINCIPAL — carrusel circular estilo familias ===== */
    (function() {
      const TOTAL = 12;
      let posGal = 0;
    
      function getVisGal() { return window.innerWidth <= 768 ? 1 : 3; }
      function getMaxGal() { return Math.max(0, TOTAL - getVisGal()); }
    
      function initGaleria() {
        const track = document.getElementById('gal-track');
        const dots  = document.getElementById('gal-dots');
        if (!track) return;
        if (dots) {
          dots.innerHTML = '';
          const pags = Math.ceil(TOTAL / getVisGal());
          for (let i = 0; i < pags; i++) {
            const d = document.createElement('div');
            d.className = 'familias-dot' + (i === 0 ? ' active' : '');
            d.onclick = () => { posGal = Math.min(i * getVisGal(), getMaxGal()); aplicarGaleria(); };
            dots.appendChild(d);
          }
        }
        aplicarGaleria();
      }
    
      function aplicarGaleria(animado = true) {
        const track = document.getElementById('gal-track');
        if (!track) return;
        const slides = track.querySelectorAll('.familia-slide');
        if (!slides.length) return;
        // Si el ancho es 0 (sin fotos cargadas), usar viewport dividido por visibles
        let slideW = slides[0].getBoundingClientRect().width;
        if (!slideW) {
          const vp = document.getElementById('fam-viewport') || track.parentElement;
          slideW = (vp.getBoundingClientRect().width - 64) / getVisGal();
        }
        const gap = 32;
        track.style.transition = animado ? 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none';
        track.style.transform = `translateX(-${posGal * (slideW + gap)}px)`;
        const prev = document.getElementById('gal-prev');
        const next = document.getElementById('gal-next');
        if (prev) prev.disabled = posGal === 0;
        if (next) next.disabled = posGal >= getMaxGal();
        const pagAct = Math.floor(posGal / getVisGal());
        document.querySelectorAll('#gal-dots .familias-dot').forEach((d, i) => d.classList.toggle('active', i === pagAct));
      }
    
      window.moverGaleria = function(dir) {
        posGal = Math.max(0, Math.min(posGal + dir, getMaxGal()));
        aplicarGaleria();
      };
    
      let rTimer;
      window.addEventListener('resize', () => {
        clearTimeout(rTimer);
        rTimer = setTimeout(() => { posGal = 0; aplicarGaleria(false); }, 80);
      });
    
      requestAnimationFrame(() => requestAnimationFrame(initGaleria));
    })();
    (function() {
      // Estado de cada carrusel: { pos, total }
      const estado = {};
    
      function initCard(id) {
        const cont = document.getElementById(id);
        if (!cont) return;
        const imgs = cont.querySelectorAll('.card-carousel-track img');
        const total = imgs.length;
        if (total === 0) return;
        estado[id] = { pos: 0, total };
    
        // Crear puntos
        const dotsEl = document.getElementById('dots-' + id);
        if (dotsEl) {
          dotsEl.innerHTML = '';
          imgs.forEach((_, i) => {
            const d = document.createElement('div');
            d.className = 'card-dot' + (i === 0 ? ' active' : '');
            dotsEl.appendChild(d);
          });
        }
    
        // Estado inicial de flechas
        actualizarCard(id);
      }
    
      function actualizarCard(id) {
        const cont = document.getElementById(id);
        if (!cont) return;
        const { pos, total } = estado[id];
        const track = cont.querySelector('.card-carousel-track');
        const ancho = cont.offsetWidth || cont.getBoundingClientRect().width || 260;
        track.style.transform = `translateX(-${pos * ancho}px)`;
    
        // Puntos
        const dots = cont.querySelectorAll('.card-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === pos));
    
        // Contador
        const counter = document.getElementById('counter-' + id);
        if (counter) counter.textContent = `${pos + 1} / ${total}`;
    
        // Flechas
        const prev = cont.querySelector('.card-arrow.prev');
        const next = cont.querySelector('.card-arrow.next');
        if (prev) prev.disabled = pos === 0;
        if (next) next.disabled = pos >= total - 1;
      }
    
      window.moverCard = function(id, dir, e) {
        if (e) e.stopPropagation(); // no disparar hover panel
        if (!estado[id]) return;
        const { pos, total } = estado[id];
        const nuevo = Math.max(0, Math.min(pos + dir, total - 1));
        estado[id].pos = nuevo;
        actualizarCard(id);
      };
    
      // Recalcular al resize
      window.addEventListener('resize', () => {
        Object.keys(estado).forEach(id => {
          const cont = document.getElementById(id);
          if (!cont) return;
          const track = cont.querySelector('.card-carousel-track');
          track.style.transition = 'none';
          const ancho = cont.offsetWidth;
          const pos = estado[id].pos;
          track.style.transform = `translateX(-${pos * ancho}px)`;
          setTimeout(() => { track.style.transition = ''; }, 50);
        });
      });
    
      // Inicializar todos los carruseles
      function initAll() {
        ['car-cabana-chica','car-cabana-mediana','car-cabana-grande',
         'car-habitaciones','car-apart','car-casa'].forEach(initCard);
      }
    
      requestAnimationFrame(() => requestAnimationFrame(initAll));
    })();
    (function() {
      const CONT     = document.getElementById('clima-container');
    
      const DIAS_ES  = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
      const DIAS_EN  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const DIAS_PT  = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    
      // Detecta día/noche en Villa Carlos Paz (UTC-3)
      function esDeDia() {
        const h = parseInt(new Date().toLocaleString('en-US', {timeZone:'America/Argentina/Cordoba', hour:'numeric', hour12:false}));
        return h >= 7 && h < 19;
      }
    
      function getIcono(code, size, forzarNoche) {
        const px = size || 48;
        const noche = forzarNoche !== undefined ? forzarNoche : !esDeDia();
        const s = {
          sol_d:`<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="#F5A623"/><g stroke="#F5A623" stroke-width="3" stroke-linecap="round"><line x1="32" y1="4" x2="32" y2="12"/><line x1="32" y1="52" x2="32" y2="60"/><line x1="4" y1="32" x2="12" y2="32"/><line x1="52" y1="32" x2="60" y2="32"/><line x1="11" y1="11" x2="17" y2="17"/><line x1="47" y1="47" x2="53" y2="53"/><line x1="53" y1="11" x2="47" y2="17"/><line x1="17" y1="47" x2="11" y2="53"/></g></svg>`,
          sol_n:`<svg viewBox="0 0 64 64"><path d="M40 32a16 16 0 1 1-16-16 12 12 0 0 0 16 16z" fill="#7986CB"/><circle cx="46" cy="14" r="2" fill="#FFD600" opacity="0.9"/><circle cx="52" cy="20" r="1.5" fill="#FFD600" opacity="0.9"/><circle cx="50" cy="10" r="1.2" fill="#FFD600" opacity="0.9"/></svg>`,
          nube:`<svg viewBox="0 0 64 64"><ellipse cx="26" cy="36" rx="18" ry="13" fill="#B0BEC5"/><ellipse cx="26" cy="30" rx="12" ry="10" fill="#CFD8DC"/><ellipse cx="36" cy="28" rx="14" ry="11" fill="#CFD8DC"/><ellipse cx="40" cy="36" rx="12" ry="10" fill="#B0BEC5"/><rect x="16" y="34" width="36" height="12" rx="6" fill="#B0BEC5"/></svg>`,
          sn_d:`<svg viewBox="0 0 64 64"><circle cx="22" cy="20" r="10" fill="#F5A623"/><g stroke="#F5A623" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="6" x2="22" y2="11"/><line x1="22" y1="29" x2="22" y2="34"/><line x1="8" y1="20" x2="13" y2="20"/><line x1="31" y1="20" x2="36" y2="20"/><line x1="12" y1="10" x2="16" y2="14"/><line x1="32" y1="10" x2="28" y2="14"/></g><ellipse cx="36" cy="44" rx="18" ry="12" fill="#90A4AE"/><ellipse cx="30" cy="38" rx="12" ry="9" fill="#B0BEC5"/><ellipse cx="42" cy="36" rx="14" ry="10" fill="#B0BEC5"/><rect x="22" y="42" width="32" height="10" rx="5" fill="#90A4AE"/></svg>`,
          sn_n:`<svg viewBox="0 0 64 64"><path d="M26 18a10 10 0 1 1-10-10 8 8 0 0 0 10 10z" fill="#7986CB"/><circle cx="32" cy="8" r="1.5" fill="#FFD600" opacity="0.85"/><circle cx="36" cy="14" r="1.2" fill="#FFD600" opacity="0.85"/><ellipse cx="38" cy="44" rx="18" ry="12" fill="#90A4AE"/><ellipse cx="32" cy="38" rx="12" ry="9" fill="#B0BEC5"/><ellipse cx="44" cy="36" rx="14" ry="10" fill="#B0BEC5"/><rect x="24" y="42" width="32" height="10" rx="5" fill="#90A4AE"/></svg>`,
          lluvia:`<svg viewBox="0 0 64 64"><ellipse cx="28" cy="26" rx="18" ry="13" fill="#90A4AE"/><ellipse cx="28" cy="20" rx="12" ry="10" fill="#B0BEC5"/><ellipse cx="38" cy="18" rx="14" ry="11" fill="#B0BEC5"/><rect x="18" y="24" width="36" height="12" rx="6" fill="#90A4AE"/><g stroke="#5B9BD5" stroke-width="2.5" stroke-linecap="round"><line x1="24" y1="42" x2="20" y2="54"/><line x1="32" y1="42" x2="28" y2="54"/><line x1="40" y1="42" x2="36" y2="54"/></g></svg>`,
          niebla:`<svg viewBox="0 0 64 64"><g stroke="#B0BEC5" stroke-width="4" stroke-linecap="round"><line x1="10" y1="22" x2="54" y2="22"/><line x1="14" y1="32" x2="50" y2="32"/><line x1="10" y1="42" x2="54" y2="42"/></g></svg>`,
          tormenta:`<svg viewBox="0 0 64 64"><ellipse cx="28" cy="22" rx="18" ry="13" fill="#78909C"/><ellipse cx="28" cy="16" rx="12" ry="10" fill="#90A4AE"/><ellipse cx="38" cy="14" rx="14" ry="11" fill="#90A4AE"/><rect x="18" y="20" width="36" height="12" rx="6" fill="#78909C"/><polygon points="34,36 26,50 33,50 28,62 42,44 34,44" fill="#FFD600"/></svg>`,
          nieve:`<svg viewBox="0 0 64 64"><ellipse cx="28" cy="26" rx="18" ry="13" fill="#90A4AE"/><ellipse cx="28" cy="20" rx="12" ry="10" fill="#B0BEC5"/><ellipse cx="38" cy="18" rx="14" ry="11" fill="#B0BEC5"/><rect x="18" y="24" width="36" height="12" rx="6" fill="#90A4AE"/><circle cx="24" cy="48" r="3" fill="#5B9BD5"/><circle cx="32" cy="54" r="3" fill="#5B9BD5"/><circle cx="40" cy="48" r="3" fill="#5B9BD5"/><circle cx="32" cy="44" r="3" fill="#5B9BD5"/></svg>`,
        };
        let svg;
        if([1000,1100].includes(code))      svg = noche ? s.sol_n : s.sol_d;
        else if(code===1101)                svg = noche ? s.sn_n  : s.sn_d;
        else if([1102,1001].includes(code)) svg = s.nube;
        else if([2000,2100].includes(code)) svg = s.niebla;
        else if([4000,4001,4200,4201].includes(code)) svg = s.lluvia;
        else if([5000,5001,5100,5101,6000,6001,6200,6201,7000,7101,7102].includes(code)) svg = s.nieve;
        else if(code===8000)                svg = s.tormenta;
        else                                svg = s.nube;
        return `<div style="width:${px}px;height:${px}px;margin:0 auto">${svg}</div>`;
      }
    
      // Paragüita — siempre visible al 100%
      function getParaguita(pct) {
        const color = pct > 0 ? '#5b8fbf' : '#9ca3af';
        const svg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"/></svg>`;
        return `${svg} <span style="color:${color};font-weight:600">${pct}%</span>`;
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
        };
        return (map[code] || {})[lang] || (map[code] || {})['es'] || '—';
      }
    
      function renderClima(current, daily, lang) {
        const c = current.data.values;
        const days = daily.timelines.daily;
        const diasN = lang==='en'?DIAS_EN:lang==='pt'?DIAS_PT:DIAS_ES;
        const hoyL  = lang==='en'?'Today':lang==='pt'?'Hoje':'Hoy';
        const sensL = lang==='en'?'Feels like':lang==='pt'?'Sens. térmica':'Sensación térmica';
        const humL  = lang==='en'?'Humidity':lang==='pt'?'Umidade':'Humedad';
        const vienL = lang==='en'?'Wind':lang==='pt'?'Vento':'Viento';
    
        let html = `
          <div class="clima-actual">
            <div class="clima-icon-wrap" style="flex-shrink:0">
              <div class="clima-tooltip">${getDesc(c.weatherCode, lang)}</div>
              ${getIcono(c.weatherCode, 72)}
            </div>
            <div class="clima-actual-temp">${Math.round(c.temperature)}°</div>
            <div class="clima-actual-info">
              <div class="clima-actual-loc">
                <svg width="10" height="12" viewBox="0 0 11 14" fill="var(--oro)"><path d="M5.5 0C2.46 0 0 2.46 0 5.5C0 9.625 5.5 14 5.5 14C5.5 14 11 9.625 11 5.5C11 2.46 8.54 0 5.5 0ZM5.5 7.5C4.395 7.5 3.5 6.605 3.5 5.5C3.5 4.395 4.395 3.5 5.5 3.5C6.605 3.5 7.5 4.395 7.5 5.5C7.5 6.605 6.605 7.5 5.5 7.5Z"/></svg>
                Villa Carlos Paz, Córdoba, Argentina
              </div>
              <div class="clima-actual-desc">${getDesc(c.weatherCode, lang)}</div>
              <div class="clima-actual-sub"><span class="clima-dato">${sensL}: ${Math.round(c.temperatureApparent)}°</span><span class="clima-sep"> &nbsp;·&nbsp; </span><span class="clima-dato">${humL}: ${Math.round(c.humidity)}%</span><span class="clima-sep"> &nbsp;·&nbsp; </span><span class="clima-dato">${vienL}: ${Math.round(c.windSpeed)} km/h</span></div>
            </div>
          </div>
          <div class="clima-grid">`;
    
        days.slice(0,6).forEach((day,i) => {
          const d = day.values;
          const dt = new Date(day.time);
          const nombre = i===0 ? hoyL : diasN[dt.getDay()];
          const lluvia = Math.round(d.precipitationProbabilityAvg||0);
          html += `
            <div class="clima-dia">
              <div class="clima-dia-nombre">${nombre}</div>
              <div style="font-size:0.75rem;color:var(--texto-medio);margin-bottom:0.4rem;font-weight:600">${dt.getDate()}/${dt.getMonth()+1}</div>
              <div class="clima-icon-wrap">
                <div class="clima-tooltip">${getDesc(d.weatherCodeMax, lang)}</div>
                ${getIcono(d.weatherCodeMax, 44)}
              </div>
              <div class="clima-dia-temps">
                <span style="color:var(--texto)">↑ ${Math.round(d.temperatureMax)}°</span>
                <span style="color:var(--texto-suave);font-weight:400">↓ ${Math.round(d.temperatureMin)}°</span>
              </div>
              <div class="clima-dia-lluvia">${getParaguita(lluvia)}</div>
            </div>`;
        });
        html += '</div>';
        CONT.innerHTML = html;
      }
    
      async function fetchClima() {
        if (!CONT) return;
        const lang = currentLang;
        try {
          const r = await fetch('/api/clima');
          if (!r.ok) throw new Error('error');
          const { realtime: curr, forecast: daily } = await r.json();
          renderClima(curr, daily, lang);
        } catch(e) {
          CONT.innerHTML = `<div class="clima-error"><span style="font-size:1.5rem;display:block;margin-bottom:0.5rem">🌡️</span>No se pudo cargar el clima. Intentá más tarde.</div>`;
        }
      }
    
      window.fetchClima = fetchClima;
      fetchClima();
      setInterval(fetchClima, 30*60*1000);
    })();
    
    const nav = document.getElementById('main-nav');
    const topbar = document.getElementById('main-topbar');
    const stickyBar = document.getElementById('stickyBar');
    const heroWidget = document.getElementById('hero-widget');
    const TOPBAR_H = 36;
    const NAV_H    = 84;
    
    function onScroll() {
      const scrollY = window.scrollY;
      const topbarVisible = scrollY <= 40;
    
      // Topbar: se oculta después de 40px, nav sube al top
      if (!topbarVisible) {
        topbar.style.transform = 'translateY(-100%)';
        topbar.style.transition = 'transform 0.3s ease';
        nav.classList.add('top-hidden');
        // Sticky bar queda justo debajo del nav (top: 68px)
        stickyBar.style.top = NAV_H + 'px';
      } else {
        topbar.style.transform = 'translateY(0)';
        nav.classList.remove('top-hidden');
        // Sticky bar queda debajo de topbar + nav (top: 104px)
        stickyBar.style.top = (TOPBAR_H + NAV_H) + 'px';
      }
    
      // Nav: se oscurece al bajar
      if (scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    
      // Sticky bar: aparece cuando el widget del hero sale de la vista
      if (heroWidget) {
        const rect = heroWidget.getBoundingClientRect();
        const limite = topbarVisible ? TOPBAR_H + NAV_H : NAV_H;
        if (rect.bottom < limite) stickyBar.classList.add('visible');
        else stickyBar.classList.remove('visible');
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
    
    /* ===== HERO foto ===== */
    const heroImg = document.getElementById('hero-main-img');
    heroImg.style.transition = 'opacity 0.4s ease';
    
    const heroImgSrc = heroImg.src; // guarda la foto actual (base64)
    const heroFotos = [
      heroImgSrc, // foto 0 = la foto principal actual (base64 embebida)
      'fotos/general/2.webp',
      'fotos/general/3.webp',
      'fotos/general/4.webp',
    ];
    
    function cambiarFotoHero(idx) {
      heroImg.style.opacity = '0';
      setTimeout(() => {
        heroImg.src = heroFotos[idx];
        heroImg.style.opacity = '1';
      }, 220);
      document.querySelectorAll('.hero-dot').forEach((d, i) => {
        d.classList.toggle('active', i === idx);
      });
    }
    
    // Touch support para los dots en mobile
      document.querySelectorAll('.hero-dot').forEach((dot, idx) => {
        dot.addEventListener('touchend', function(e) {
          e.preventDefault();
          cambiarFotoHero(idx);
        });
      });
    
    /* ===== WhatsApp helpers ===== */
    function fmtFecha(iso) {
      // Convierte YYYY-MM-DD → DD/MM/YYYY
      if (!iso) return '';
      var p = iso.split('-');
      return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : iso;
    }
    
    function buildMsg(llegada, salida, huesp, tipo) {
      const t = i18n[currentLang];
      let msg = encodeURIComponent(
        currentLang === 'es' ? '¡Hola! Quisiera consultar disponibilidad en Brisas de Oro.' :
        currentLang === 'en' ? 'Hello! I\'d like to check availability at Brisas de Oro.' :
        'Olá! Gostaria de consultar disponibilidade em Brisas de Oro.'
      );
      if (llegada) msg += '%0A' + encodeURIComponent((t['widget.llegada'] || 'Llegada') + ': ' + fmtFecha(llegada));
      if (salida)  msg += '%0A' + encodeURIComponent((t['widget.salida']  || 'Salida')  + ': ' + fmtFecha(salida));
      if (huesp)   msg += '%0A' + encodeURIComponent((t['widget.huespedes'] || 'Huéspedes') + ': ' + huesp);
      if (tipo && tipo !== (t['widget.cualquiera'] || 'Cualquiera'))
                   msg += '%0A' + encodeURIComponent((t['widget.tipo'] || 'Tipo') + ': ' + tipo);
      return 'https://wa.me/543541548053?text=' + msg;
    }
    
    // Detectar mobile
    function esMobile() {
      return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    
    // Abrir WhatsApp — esquema directo en mobile, wa.me en desktop
    function abrirWsp(texto) {
      const msg = encodeURIComponent(texto);
      const url = esMobile()
        ? `whatsapp://send?phone=543541548053&text=${msg}`
        : `https://wa.me/543541548053?text=${msg}`;
      window.open(url, '_blank');
    }
    
    
    function mostrarErrorHero() {
      document.getElementById('hero-fecha-error').classList.add('visible');
    }
    function ocultarErrorHero() {
      const el = document.getElementById('hero-fecha-error');
      if (el) el.classList.remove('visible');
    }
    function mostrarErrorModal() {
      document.getElementById('date-modal-error').classList.add('visible');
    }
    
    function consultarWhatsApp() {
      const ahora = new Date();
      const hoy = ahora.getFullYear() + '-' +
        String(ahora.getMonth() + 1).padStart(2,'0') + '-' +
        String(ahora.getDate()).padStart(2,'0');
      const llegadaH   = document.getElementById('fecha-llegada').value;
      const salidaH    = document.getElementById('fecha-salida').value;
      const huespedesH = String(normalizarHuespedes('huespedes') ?? '');
      const tipoH      = document.getElementById('tipo-aloj').value;
      // Validar campos obligatorios
      if (!llegadaH || !salidaH || !huespedesH || huespedesH === '0') {
        document.getElementById('hero-fecha-error').textContent = getLang() === 'en'
          ? '⚠ Please fill in check-in date, check-out date and number of guests.'
          : getLang() === 'pt'
          ? '⚠ Por favor preencha a data de chegada, saída e número de hóspedes.'
          : '⚠ Por favor completá la fecha de llegada, salida y cantidad de huéspedes.';
        mostrarErrorHero(); return;
      }
      if (llegadaH < hoy) {
        document.getElementById('hero-fecha-error').textContent = getLang() === 'en'
          ? '⚠ Invalid date. Please select a date from today onwards.'
          : getLang() === 'pt'
          ? '⚠ Data inválida. Por favor selecione uma data a partir de hoje.'
          : '⚠ Fecha no válida. Por favor seleccioná una fecha a partir del día de hoy.';
        mostrarErrorHero(); return;
      }
      if (salidaH < hoy) {
        document.getElementById('hero-fecha-error').textContent = getLang() === 'en'
          ? '⚠ Invalid date. Please select a date from today onwards.'
          : getLang() === 'pt'
          ? '⚠ Data inválida. Por favor selecione uma data a partir de hoje.'
          : '⚠ Fecha no válida. Por favor seleccioná una fecha a partir del día de hoy.';
        mostrarErrorHero(); return;
      }
      if (reglaFechas() && salidaH <= llegadaH) {
        document.getElementById('hero-fecha-error').textContent = '⚠ ' + textoAviso(AVISO_SALIDA_INVALIDA);
        mostrarErrorHero(); return;
      }
      ocultarErrorHero();
      const params = new URLSearchParams({
        fechaIngreso:     llegadaH,
        fechaEgreso:      salidaH,
        cantidadPersonas: huespedesH,
        tipo:             tipoH || 'Cualquiera',
      });
      window.location.href = (currentLang === 'es' ? '' : '/' + currentLang) + '/disponibilidad?' + params.toString();
    }
    
    function mostrarErrorSticky(msg) {
      const el = document.getElementById('sticky-error');
      if (el) { el.textContent = msg; el.classList.add('visible'); }
    }
    function ocultarErrorSticky() {
      const el = document.getElementById('sticky-error');
      if (el) el.classList.remove('visible');
    }
    function consultarStickyWsp() {
      const ahora = new Date();
      const hoy = ahora.getFullYear() + '-' +
        String(ahora.getMonth() + 1).padStart(2,'0') + '-' +
        String(ahora.getDate()).padStart(2,'0');
      const llegadaS   = document.getElementById('s-llegada').value;
      const salidaS    = document.getElementById('s-salida').value;
      const huespedesS = String(normalizarHuespedes('s-huespedes') ?? '');
      const tipoS      = document.getElementById('s-tipo').value;
      // Validar campos obligatorios
      if (!llegadaS || !salidaS || !huespedesS || huespedesS === '0') {
        mostrarErrorSticky(getLang() === 'en'
          ? '⚠ Please fill in check-in date, check-out date and number of guests.'
          : getLang() === 'pt'
          ? '⚠ Por favor preencha a data de chegada, saída e número de hóspedes.'
          : '⚠ Por favor completá la fecha de llegada, salida y cantidad de huéspedes.');
        return;
      }
      if (llegadaS < hoy) {
        mostrarErrorSticky(getLang() === 'en'
          ? '⚠ Invalid date. Please select a date from today onwards.'
          : getLang() === 'pt'
          ? '⚠ Data inválida. Por favor selecione uma data a partir de hoje.'
          : '⚠ Fecha no válida. Por favor seleccioná una fecha a partir del día de hoy.');
        return;
      }
      if (salidaS < hoy) {
        mostrarErrorSticky(getLang() === 'en'
          ? '⚠ Invalid date. Please select a date from today onwards.'
          : getLang() === 'pt'
          ? '⚠ Data inválida. Por favor selecione uma data a partir de hoje.'
          : '⚠ Fecha no válida. Por favor seleccioná una fecha a partir del día de hoy.');
        return;
      }
      if (reglaFechas() && salidaS <= llegadaS) {
        mostrarErrorSticky('⚠ ' + textoAviso(AVISO_SALIDA_INVALIDA));
        return;
      }
      ocultarErrorSticky();
      const params = new URLSearchParams({
        fechaIngreso:     llegadaS,
        fechaEgreso:      salidaS,
        cantidadPersonas: huespedesS,
        tipo:             tipoS || 'Cualquiera',
      });
      window.location.href = (currentLang === 'es' ? '' : '/' + currentLang) + '/disponibilidad?' + params.toString();
    }
    
    // Construir el texto del mensaje
    
    // ── Mensajes WhatsApp según idioma activo ──
    function getLang() {
      return (document.getElementById('current-lang')?.textContent || 'ES').toLowerCase();
    }
    
    function getMsgWsp(tipo) {
      const msgs = {
        es: {
          general:   'Hola! Quisiera consultar disponibilidad en Brisas de Oro.',
          cabChica:  'Hola, quiero consultar por la cabaña chica.',
          cabMed:    'Hola, quiero consultar por la cabaña mediana.',
          cabGrande: 'Hola, quiero consultar por la cabaña grande.',
          habit:     'Hola, quiero consultar por una habitación.',
          apart:     'Hola, quiero consultar por el apart hotel.',
          casa:      'Hola, quiero consultar por la Casa con Pileta en Icho Cruz.',
        },
        en: {
          general:   'Hello! I would like to check availability at Brisas de Oro.',
          cabChica:  'Hello, I would like to inquire about the small cabin.',
          cabMed:    'Hello, I would like to inquire about the medium cabin.',
          cabGrande: 'Hello, I would like to inquire about the large cabin.',
          habit:     'Hello, I would like to inquire about a hotel room.',
          apart:     'Hello, I would like to inquire about the apart hotel.',
          casa:      'Hello, I would like to inquire about the House with Pool in Icho Cruz.',
        },
        pt: {
          general:   'Olá! Gostaria de consultar disponibilidade no Brisas de Oro.',
          cabChica:  'Olá, gostaria de consultar sobre o chalé pequeno.',
          cabMed:    'Olá, gostaria de consultar sobre o chalé médio.',
          cabGrande: 'Olá, gostaria de consultar sobre o chalé grande.',
          habit:     'Olá, gostaria de consultar sobre um quarto de hotel.',
          apart:     'Olá, gostaria de consultar sobre o apart hotel.',
          casa:      'Olá, gostaria de consultar sobre a Casa com Piscina em Icho Cruz.',
        }
      };
      const t = msgs[getLang()] || msgs.es;
      return t[tipo] || t.general;
    }
    
    function buildMsgTexto(llegada, salida, huespedes, tipo) {
      const lang = getLang();
      const txt = {
        es: {
          saludo: 'Hola! Quisiera consultar disponibilidad en Brisas de Oro.',
          llegada: 'Llegada', salida: 'Salida', huespedes: 'Huéspedes', tipo: 'Tipo',
          cualquiera: 'Cualquiera'
        },
        en: {
          saludo: 'Hello! I would like to check availability at Brisas de Oro.',
          llegada: 'Check-in', salida: 'Check-out', huespedes: 'Guests', tipo: 'Type',
          cualquiera: 'Any'
        },
        pt: {
          saludo: 'Olá! Gostaria de consultar disponibilidade no Brisas de Oro.',
          llegada: 'Chegada', salida: 'Saída', huespedes: 'Hóspedes', tipo: 'Tipo',
          cualquiera: 'Qualquer'
        }
      };
      const t = txt[lang] || txt.es;
      let msg = t.saludo;
      if (llegada) msg += `%0A${t.llegada}: ${fmtFecha(llegada)}`;
      if (salida)  msg += `%0A${t.salida}: ${fmtFecha(salida)}`;
      if (huespedes) msg += `%0A${t.huespedes}: ${huespedes}`;
      if (tipo && tipo !== 'Cualquiera' && tipo !== 'Any' && tipo !== 'Qualquer')
        msg += `%0A${t.tipo}: ${tipo}`;
      return decodeURIComponent(msg);
    }
    // Fechas del buscador principal (mobile): el valor se muestra en el placeholder con la letra de los selects
    function actualizarFechaPh(input) {
      const wrap = input.closest('.date-wrap');
      if (!wrap) return;
      wrap.classList.toggle('has-value', input.value !== '');
      const txt = wrap.querySelector('.date-ph-txt');
      if (txt) txt.textContent = input.value ? fmtFecha(input.value) : 'dd/mm/aaaa';
    }
    window.actualizarFechaPh = actualizarFechaPh;
    // Contador de huéspedes: con los botones va de 1 a 30; a mano se acepta más (/disponibilidad deriva a WhatsApp)
    const HUESPEDES_MAX_BOTONES = 30;
    function actualizarContador(id) {
      const input = document.getElementById(id);
      const n = parseInt(input.value, 10) || 0;
      const wrap = input.closest('.contador');
      wrap.querySelector('.contador-menos').disabled = n <= 1;
      wrap.querySelector('.contador-mas').disabled = n >= HUESPEDES_MAX_BOTONES;
      if (id === 's-huespedes') actualizarEtiquetaHuespedes();
    }
    // Etiqueta del campo de la barra flotante: si no entra (letra grande), solo el ícono con el número
    function actualizarEtiquetaHuespedes() {
      const label = document.getElementById('s-huespedes-label');
      const valor = document.getElementById('s-huespedes').value;
      const t = i18n[currentLang];
      label.textContent = valor ? `${valor} ${t['widget.huesp.val']}` : t['widget.huesp.ph'];
      if (label.scrollWidth > label.clientWidth) label.textContent = valor;
    }
    new ResizeObserver(actualizarEtiquetaHuespedes).observe(document.getElementById('s-huespedes-trigger'));
    // Devuelve la cantidad, o null si todavía no se eligió
    function normalizarHuespedes(id) {
      const input = document.getElementById(id);
      const n = parseInt(input.value, 10);
      input.value = n >= 1 ? n : '';
      actualizarContador(id);
      return n >= 1 ? n : null;
    }
    function escribirHuespedes(input) {
      input.value = input.value.replace(/\D/g, '').replace(/^0+/, '').slice(0, 3);
      actualizarContador(input.id);
    }
    function cambiarHuespedes(id, delta) {
      const n = normalizarHuespedes(id);
      if (n === null && delta < 0) return;
      document.getElementById(id).value = n === null ? 1 : delta < 0 ? Math.max(n - 1, 1) : Math.min(n + 1, HUESPEDES_MAX_BOTONES);
      actualizarContador(id);
    }
    function toggleHuespedes() {
      const wrap = document.getElementById('s-huespedes-wrap');
      const abrir = !wrap.classList.contains('open');
      cerrarDropdowns();
      if (!abrir) return;
      wrap.classList.add('open');
      document.getElementById('s-huespedes-trigger').setAttribute('aria-expanded', 'true');
      posicionarDropdown(wrap);
    }
    // ===== FECHAS: Salida recién con Llegada, desde el día siguiente (celular y computadora; 768 px queda como antes) =====
    var AVISO_LLEGADA_PRIMERO = { es: 'Primero elegí la fecha de llegada.', en: 'Choose the check-in date first.', pt: 'Escolha primeiro a data de chegada.' };
    var AVISO_SALIDA_INVALIDA = {
      es: 'La salida tiene que ser al día siguiente de la llegada o después.',
      en: 'Check-out must be the day after check-in or later.',
      pt: 'A saída precisa ser no dia seguinte à chegada ou depois.'
    };
    var PARES_FECHA = [['fecha-llegada', 'fecha-salida', false], ['s-llegada', 's-salida', true]];
    function reglaFechas() { return true; }
    function textoAviso(textos) { return textos[getLang()] || textos.es; }
    function avisoFechas(sticky, textos) {
      if (sticky) { mostrarErrorSticky(textoAviso(textos)); return; }
      document.getElementById('hero-fecha-error').textContent = textoAviso(textos);
      mostrarErrorHero();
    }
    // "2026-11-10" → "2026-11-11"
    function diaSiguiente(fecha) {
      const [y, m, d] = fecha.split('-').map(Number);
      const s = new Date(y, m - 1, d + 1);
      return s.getFullYear() + '-' + String(s.getMonth() + 1).padStart(2,'0') + '-' + String(s.getDate()).padStart(2,'0');
    }
    // Salida deshabilitada sin Llegada y con mínimo Llegada + 1. En 768 px, como antes (mínimo = Llegada)
    function actualizarSalida(idLlegada, idSalida) {
      const llegada = document.getElementById(idLlegada).value;
      const salida = document.getElementById(idSalida);
      if (!salida) return;
      if (reglaFechas()) {
        salida.disabled = !llegada;
        if (llegada) salida.min = diaSiguiente(llegada);
      } else {
        salida.disabled = false;
        if (llegada) salida.min = llegada;
      }
    }
    // Vacía Salida (valor y lo que muestra el campo)
    function limpiarSalida(idSalida) {
      const salida = document.getElementById(idSalida);
      salida.value = '';
      if (idSalida === 'fecha-salida') { actualizarFechaPh(salida); return; }
      const label = salida.closest('.sticky-field').querySelector('.sticky-label');
      label.innerHTML = i18n[getLang()]['widget.salida'];
      label.style.color = '';
    }
    function alCambiarLlegada(idLlegada, idSalida, sticky) {
      actualizarSalida(idLlegada, idSalida);
      if (!reglaFechas()) return;
      if (sticky) ocultarErrorSticky();
      const llegada = document.getElementById(idLlegada).value;
      const salida = document.getElementById(idSalida).value;
      if (llegada && salida && salida <= llegada) {
        limpiarSalida(idSalida);
        avisoFechas(sticky, AVISO_SALIDA_INVALIDA);
      }
    }

    // ===== MODAL FECHA MOBILE =====
    var _modalCampo = null;
    function abrirFechaModal(campo) {
      if (window.innerWidth > 768) return; // solo mobile
      if (campo === 'salida' && document.getElementById('s-salida').disabled) {
        avisoFechas(true, AVISO_LLEGADA_PRIMERO); return;
      }
      _modalCampo = campo;
      const lang2 = getLang();
      const tituloMap = {
        es: { llegada: 'Fecha de llegada', salida: 'Fecha de salida' },
        en: { llegada: 'Check-in date',    salida: 'Check-out date'  },
        pt: { llegada: 'Data de chegada',  salida: 'Data de saída'   }
      };
      const titulo = (tituloMap[lang2] || tituloMap.es)[campo];
      document.getElementById('date-modal-title').textContent = titulo;
      document.getElementById('date-modal-error').classList.remove('visible');
      const input = document.getElementById('date-modal-input');
      const ahora = new Date();
      const hoy = ahora.getFullYear() + '-' +
        String(ahora.getMonth() + 1).padStart(2,'0') + '-' +
        String(ahora.getDate()).padStart(2,'0');
      const llegadaModal = document.getElementById('s-llegada').value;
      input.min = campo === 'salida' && llegadaModal
        ? (reglaFechas() ? diaSiguiente(llegadaModal) : llegadaModal) : hoy;
      input.value = document.getElementById('s-' + campo).value || '';
      document.getElementById('date-modal-overlay').classList.add('open');
      document.getElementById('date-modal-overlay').style.display = 'flex';
      // Ocultar error al cambiar la fecha
      input.onchange = function() {
        const ahora2 = new Date();
        const hoyCheck = ahora2.getFullYear() + '-' +
          String(ahora2.getMonth() + 1).padStart(2,'0') + '-' +
          String(ahora2.getDate()).padStart(2,'0');
        if (this.value >= hoyCheck) {
          document.getElementById('date-modal-error').classList.remove('visible');
        }
      };
      setTimeout(() => { input.focus(); input.click(); }, 100);
    }
    function confirmarFechaModal() {
      const val = document.getElementById('date-modal-input').value;
      const ahora = new Date();
      const hoy = ahora.getFullYear() + '-' +
        String(ahora.getMonth() + 1).padStart(2,'0') + '-' +
        String(ahora.getDate()).padStart(2,'0');
      if (val && val < hoy) {
        document.getElementById('date-modal-error').classList.add('visible');
        return;
      }
      if (val && _modalCampo) {
        document.getElementById('s-' + _modalCampo).value = val;
        // Mostrar fecha en el label del campo
        const [y,m,d] = val.split('-');
        const fechaLegible = `${d}/${m}`;
        const campo = _modalCampo === 'llegada' ? 'llegada' : 'salida';
        // Buscar el sticky-label del campo y actualizarlo
        const inputs = document.querySelectorAll('.sticky-field');
        inputs.forEach(function(field) {
          const input = field.querySelector('input');
          const label = field.querySelector('.sticky-label');
          if (input && input.id === 's-' + campo && label) {
            label.textContent = fechaLegible;
            label.style.color = 'rgba(245,242,236,0.9)';
          }
        });
        if (campo === 'llegada') alCambiarLlegada('s-llegada', 's-salida', true);
      }
      cerrarFechaModal();
    }
    function cerrarFechaModal() {
      document.getElementById('date-modal-error').classList.remove('visible');
      const overlay = document.getElementById('date-modal-overlay');
      overlay.classList.remove('open');
      overlay.style.display = 'none';
      _modalCampo = null;
    }
    // Cerrar al tocar el overlay
      document.getElementById('date-modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) cerrarFechaModal();
      });
      const ahora = new Date();
      const hoy = ahora.getFullYear() + '-' +
        String(ahora.getMonth() + 1).padStart(2,'0') + '-' +
        String(ahora.getDate()).padStart(2,'0');
      ['s-llegada','s-salida','fecha-llegada','fecha-salida'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.min = hoy;
      });
      // Cuando cambia llegada, actualizar mínimo de salida
      ['s-llegada','fecha-llegada'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('change', function() {
          var salidaId = id.replace('llegada','salida');
          var salida = document.getElementById(salidaId);
          if (salida && this.value) salida.min = this.value;
        });
      });
      // Ocultar error sticky al cambiar cualquier campo
      ['s-llegada','s-salida','s-huespedes','s-tipo'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('change', function() { ocultarErrorSticky(); });
      });
      // Ocultar error hero al seleccionar fecha válida
      ['fecha-llegada','fecha-salida'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('change', function() {
          const ahora2 = new Date();
          const hoyCheck = ahora2.getFullYear() + '-' +
            String(ahora2.getMonth() + 1).padStart(2,'0') + '-' +
            String(ahora2.getDate()).padStart(2,'0');
          if (this.value >= hoyCheck) ocultarErrorHero();
        });
      });
      // Salida deshabilitada hasta elegir Llegada, y desde Llegada + 1
      PARES_FECHA.forEach(function(par) {
        actualizarSalida(par[0], par[1]);
        var llegada = document.getElementById(par[0]);
        if (llegada) llegada.addEventListener('change', function() { alCambiarLlegada(par[0], par[1], par[2]); });
      });
      window.matchMedia('(max-width: 767px), (min-width: 769px)').addEventListener('change', function() {
        PARES_FECHA.forEach(function(par) { actualizarSalida(par[0], par[1]); });
      });
      // Tocar la Salida deshabilitada del hero (no recibe toques: llegan al contenedor)
      var wrapSalida = document.getElementById('wrap-salida');
      if (wrapSalida) wrapSalida.addEventListener('click', function() {
        if (document.getElementById('fecha-salida').disabled) avisoFechas(false, AVISO_LLEGADA_PRIMERO);
      });
      // Lo mismo en la barra en computadora (en celular avisa abrirFechaModal)
      var campoSalida = document.getElementById('s-salida');
      if (campoSalida) campoSalida.closest('.sticky-field').addEventListener('click', function() {
        if (window.innerWidth > 768 && campoSalida.disabled) avisoFechas(true, AVISO_LLEGADA_PRIMERO);
      });

    // Visibilidad JS de los párrafos del hero (respaldo al CSS solo-mobile/solo-desktop)
    function actualizarDescMobile() {
      var isMobile = window.innerWidth < 768;
      var mobile  = document.getElementById('hero-desc-mobile');
      var desktop = document.getElementById('hero-desc-desktop');
      if (mobile)  mobile.style.display  = isMobile ? 'block' : 'none';
      if (desktop) desktop.style.display = isMobile ? 'none'  : 'block';
    }
    actualizarDescMobile();
    window.addEventListener('resize', actualizarDescMobile);

    // Cierra todos los dropdowns custom y devuelve el hero a overflow:hidden
    function cerrarDropdowns() {
      document.querySelectorAll('.custom-tipo-wrap, .huesp-wrap').forEach(function(w) { w.classList.remove('open'); });
      document.getElementById('s-huespedes-trigger').setAttribute('aria-expanded', 'false');
      var hero = document.querySelector('.hero');
      if (hero) hero.classList.remove('dd-abierto');
    }
    // Ubica la lista abierta: hacia abajo si entra en pantalla, si no hacia arriba; con alto máximo y scroll interno
    function posicionarDropdown(wrap) {
      var opts = wrap.querySelector('.custom-tipo-opts, .huesp-pop');
      if (!opts) return;
      var hero = wrap.closest('.hero');
      if (hero) hero.classList.add('dd-abierto'); // el hero recorta con overflow:hidden
      opts.classList.remove('dd-arriba');
      opts.style.maxHeight = '';
      var MAX = 280, MARGEN = 8;
      var trig = wrap.getBoundingClientRect();
      // Lo que tapa la parte de arriba de la pantalla: nav fijo y (si está visible y no es la propia) la barra flotante
      var techo = 0;
      var nav = document.getElementById('main-nav');
      if (nav) techo = Math.max(techo, nav.getBoundingClientRect().bottom);
      var sticky = document.getElementById('stickyBar');
      if (sticky && sticky.classList.contains('visible') && !sticky.contains(wrap)) techo = Math.max(techo, sticky.getBoundingClientRect().bottom);
      var abajo  = window.innerHeight - trig.bottom - MARGEN;
      var arriba = trig.top - techo - MARGEN;
      var alto   = Math.min(opts.scrollHeight, MAX);
      var haciaArriba = alto > abajo && arriba > abajo;
      if (haciaArriba) opts.classList.add('dd-arriba');
      opts.style.maxHeight = Math.max(120, Math.min(MAX, haciaArriba ? arriba : abajo)) + 'px';
    }
    // Custom tipo dropdown (mobile only)
    function toggleCustomTipo(wrapId) {
      var wrap = document.getElementById(wrapId);
      if (!wrap) return;
      var isOpen = wrap.classList.contains('open');
      cerrarDropdowns();
      if (!isOpen) { wrap.classList.add('open'); posicionarDropdown(wrap); }
    }
    function preTouchCustomTipo(btn) {
      var opts = btn.closest('.custom-tipo-opts');
      if (!opts) return;
      opts.querySelectorAll('.custom-tipo-opt').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
    }
    function selectCustomTipo(selectId, wrapId, btn) {
      var select = document.getElementById(selectId);
      var wrap = document.getElementById(wrapId);
      if (!select || !wrap) return;
      select.selectedIndex = parseInt(btn.dataset.index);
      var label = document.getElementById(selectId + '-label');
      if (label) {
        label.textContent = (selectId === 's-tipo' && btn.dataset.abbr) ? btn.dataset.abbr : btn.textContent;
      }
      wrap.querySelectorAll('.custom-tipo-opt').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      cerrarDropdowns();
    }
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.custom-tipo-wrap') && !e.target.closest('.huesp-wrap')) {
        cerrarDropdowns();
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key !== 'Escape' || !document.getElementById('s-huespedes-wrap').classList.contains('open')) return;
      cerrarDropdowns();
      document.getElementById('s-huespedes-trigger').focus();
    });

    // Expose functions to window so HTML inline onclick handlers can call them
    window.toggleLang         = toggleLang
    window.setLang            = setLang

    // Páginas /en y /pt: el HTML ya llega traducido del servidor; esto ajusta selector, clases y textos dinámicos
    if (pageLang !== 'es') {
      applyTranslations(pageLang);
      if (window.fetchClima) window.fetchClima();
    }
    window.abrirWsp           = abrirWsp
    window.getMsgWsp          = getMsgWsp
    window.scrollToId         = scrollToId
    window.toggleMenu         = toggleMenu
    window.cerrarMenu         = cerrarMenu
    window.confirmarFechaModal = confirmarFechaModal
    window.cerrarFechaModal   = cerrarFechaModal
    window.abrirFechaModal    = abrirFechaModal
    window.consultarStickyWsp = consultarStickyWsp
    window.cambiarFotoHero    = cambiarFotoHero
    window.toggleAcord        = toggleAcord
    window.consultarWhatsApp  = consultarWhatsApp
    window.toggleCustomTipo   = toggleCustomTipo
    window.selectCustomTipo   = selectCustomTipo
    window.preTouchCustomTipo = preTouchCustomTipo
    window.cambiarHuespedes   = cambiarHuespedes
    window.toggleHuespedes    = toggleHuespedes
    window.cerrarDropdowns    = cerrarDropdowns
    window.escribirHuespedes  = escribirHuespedes
    window.normalizarHuespedes = normalizarHuespedes
  }, [])

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {lang === 'es' && <meta name="keywords" content={seo.keywords} />}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL + localePath(lang)} />
        {LOCALES.map(l => <link key={"hreflang-" + l} rel="alternate" hrefLang={l} href={SITE_URL + localePath(l)} />)}
        <link rel="alternate" hrefLang="x-default" href={SITE_URL + '/'} />

        {/* ===== OPEN GRAPH (WhatsApp, Facebook, etc.) ===== */}
        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:image" content="https://img.alqastatic.com/_propiedades_/aw75/o_aw75_Cabana_8YKDOJVE.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={SITE_URL + localePath(lang)} />
        <meta property="og:locale" content={seo.ogLocale} />
        {LOCALES.filter(l => l !== lang).map(l => <meta key={"og-locale-" + l} property="og:locale:alternate" content={SEO[l].ogLocale} />)}
        <meta property="og:site_name" content="Brisas de Oro Hotel y Cabañas" />
        <meta property="business:contact_data:street_address" content="Av. Ramón J. Cárcano 2590" />
        <meta property="business:contact_data:locality" content="Villa Carlos Paz" />
        <meta property="business:contact_data:region" content="Córdoba" />
        <meta property="business:contact_data:country_name" content="Argentina" />
        <meta property="business:contact_data:phone_number" content="+54 9 3541 548053" />

        {/* ===== TWITTER / X CARD ===== */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.ogTitle} />
        <meta name="twitter:description" content={seo.twitterDescription} />
        <meta name="twitter:image" content="https://img.alqastatic.com/_propiedades_/aw75/o_aw75_Cabana_8YKDOJVE.jpg" />

        {/* ===== SCHEMA.ORG — Hotel + LocalBusiness ===== */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(HOTEL_SCHEMA) }} />
      </Head>
      <div dangerouslySetInnerHTML={{__html: translateHtml(HTML, I18N[lang], lang)}} />
    </>
  )
}

/* ===== MARKUP (en español; translateHtml lo traduce en el servidor para /en y /pt) ===== */
const HTML = `

<!-- ============================================================ TOPBAR -->
<div class="topbar" id="main-topbar">
  <div class="topbar-inner">
    <div class="topbar-dirs">
      <a class="topbar-dir"
         href="https://www.google.com/maps/search/Av.+Ram%C3%B3n+J.+C%C3%A1rcano+2590+Villa+Carlos+Paz+C%C3%B3rdoba+Argentina"
         target="_blank" rel="noopener">
        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;opacity:0.7">
        <path d="M5.5 0C2.46 0 0 2.46 0 5.5C0 9.625 5.5 14 5.5 14C5.5 14 11 9.625 11 5.5C11 2.46 8.54 0 5.5 0ZM5.5 7.5C4.395 7.5 3.5 6.605 3.5 5.5C3.5 4.395 4.395 3.5 5.5 3.5C6.605 3.5 7.5 4.395 7.5 5.5C7.5 6.605 6.605 7.5 5.5 7.5Z" fill="var(--oro)"/>
      </svg>
        <span class="solo-desktop" data-i18n="topbar.dir">Av. Ramón J. Cárcano 2590 · Villa Carlos Paz, Córdoba</span>
        <span class="solo-mobile" data-i18n="topbar.dir.short">Av. Ramón J. Cárcano 2590</span>
      </a>
      <span class="topbar-sep"></span>
      <a class="topbar-dir"
         href="https://maps.app.goo.gl/LNTt8TeZjFvNtwUY9"
         target="_blank" rel="noopener">
        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;opacity:0.7">
        <path d="M5.5 0C2.46 0 0 2.46 0 5.5C0 9.625 5.5 14 5.5 14C5.5 14 11 9.625 11 5.5C11 2.46 8.54 0 5.5 0ZM5.5 7.5C4.395 7.5 3.5 6.605 3.5 5.5C3.5 4.395 4.395 3.5 5.5 3.5C6.605 3.5 7.5 4.395 7.5 5.5C7.5 6.605 6.605 7.5 5.5 7.5Z" fill="var(--oro)"/>
      </svg>
        <span class="solo-desktop" data-i18n="topbar.casa">Casa con Pileta · Icho Cruz</span>
        <span class="solo-mobile" data-i18n="topbar.casa.short">Casa · Icho Cruz</span>
      </a>
    </div>
  </div>
</div>

<!-- ============================================================ NAV -->
<nav id="main-nav">
  <div class="nav-inner">
    <a onclick="window.scrollTo({top:0,behavior:'smooth'})" class="logo" style="cursor:pointer;">
      <img src="/logo.webp" alt="Hotel y Cabañas Brisas de Oro">
    </a>
    <ul class="nav-links">
      <li><a href="#nosotros" onclick="event.preventDefault();scrollToId('nosotros')" data-i18n="nav.nosotros">Nosotros</a></li>
      <li><a href="#alojamientos" onclick="event.preventDefault();scrollToId('alojamientos')" data-i18n="nav.alojamientos">Alojamientos</a></li>
      <li><a href="#antes-de-reservar" onclick="event.preventDefault();scrollToId('antes-de-reservar')" data-i18n="nav.info">Info importante</a></li>
      <li><a href="#servicios" onclick="event.preventDefault();scrollToId('servicios')" data-i18n="nav.servicios">Servicios</a></li>
      <li><a href="#testimonios" onclick="event.preventDefault();scrollToId('testimonios')" data-i18n="nav.testimonios">Reseñas</a></li>
      <li><a href="#clima" onclick="event.preventDefault();scrollToId('clima')" data-i18n="nav.clima">Clima</a></li>
      <li><a href="#ubicacion" onclick="event.preventDefault();scrollToId('ubicacion')" data-i18n="nav.ubicacion">Ubicación</a></li>
    </ul>
    <div class="nav-right">
      <!-- Selector de idioma -->
      <div class="lang-selector" id="langSelector">
        <button class="lang-btn" onclick="toggleLang()">
          <span class="globe">🌐</span>
          <span id="current-lang">ES</span>
          <span class="chevron">▼</span>
        </button>
        <div class="lang-dropdown" id="langDropdown">
          <div class="lang-option active" onclick="setLang('es')"><span class="flag">ES</span> Español</div>
          <div class="lang-option" onclick="setLang('en')"><span class="flag">EN</span> English</div>
          <div class="lang-option" onclick="setLang('pt')"><span class="flag">PT</span> Português</div>
        </div>
      </div>
      <a href="javascript:void(0)" onclick="abrirWsp(getMsgWsp('general'))" class="nav-cta" data-i18n="nav.cta">Consultar</a>
      <!-- Hamburguesa (solo mobile) -->
      <button class="nav-hamburger" id="nav-hamburger" onclick="toggleMenu()" aria-label="Menú" style="display:none">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<!-- Menú mobile desplegable -->
<nav class="nav-mobile-menu" id="nav-mobile-menu">
  <a onclick="cerrarMenu();scrollToId('nosotros')" data-i18n="nav.nosotros">Nosotros</a>
  <a onclick="cerrarMenu();scrollToId('alojamientos')" data-i18n="nav.alojamientos">Alojamientos</a>
  <a onclick="cerrarMenu();scrollToId('antes-de-reservar')" data-i18n="nav.info">Info importante</a>
  <a onclick="cerrarMenu();scrollToId('servicios')" data-i18n="nav.servicios">Servicios</a>
  <a onclick="cerrarMenu();scrollToId('testimonios')" data-i18n="nav.testimonios">Reseñas</a>
  <a onclick="cerrarMenu();scrollToId('clima')" data-i18n="nav.clima">Clima</a>
  <a onclick="cerrarMenu();scrollToId('ubicacion')" data-i18n="nav.ubicacion">Ubicación</a>
</nav>

<!-- Modal fecha mobile -->
<div class="date-modal-overlay" id="date-modal-overlay" style="display:none!important">
  <div class="date-modal">
    <p class="date-modal-title" id="date-modal-title">Llegada</p>
    <input type="date" id="date-modal-input">
    <p id="date-modal-error">La fecha ingresada no es válida.<br>Por favor seleccioná una fecha a partir del día de hoy.</p>
    <button class="date-modal-confirm" onclick="confirmarFechaModal()">Confirmar</button>
    <button class="date-modal-cancel" onclick="cerrarFechaModal()">Cancelar</button>
  </div>
</div>

<!-- ============================================================ STICKY BOOKING BAR -->
<div class="sticky-bar" id="stickyBar">
  <div class="sticky-bar-inner">
    <div class="sticky-fechas">
    <div class="sticky-field" onclick="if(window.innerWidth<=768)abrirFechaModal('llegada')">
      <span class="sticky-label" data-i18n="widget.llegada">Llegada</span>
      <input type="date" id="s-llegada" onclick="if(window.innerWidth<=768){event.preventDefault();event.stopPropagation();abrirFechaModal('llegada')}">
    </div>
    <div class="sticky-field" onclick="if(window.innerWidth<=768)abrirFechaModal('salida')">
      <span class="sticky-label" data-i18n="widget.salida">Salida</span>
      <input type="date" id="s-salida" onclick="if(window.innerWidth<=768){event.preventDefault();event.stopPropagation();abrirFechaModal('salida')}">
    </div>
    </div>
    <div class="sticky-selects">
    <div class="sticky-field sticky-field--huesp">
      <div class="huesp-wrap" id="s-huespedes-wrap">
        <button type="button" class="huesp-trigger" id="s-huespedes-trigger" data-i18n-aria="widget.huespedes" aria-label="Huéspedes" aria-haspopup="dialog" aria-expanded="false" onclick="toggleHuespedes()">
          <svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span class="huesp-label" id="s-huespedes-label">Huésp.</span>
        </button>
        <div class="huesp-pop" role="dialog" data-i18n-aria="widget.huespedes" aria-label="Huéspedes">
          <div class="contador">
            <button type="button" class="contador-btn contador-menos" data-i18n-aria="widget.menos" aria-label="Menos huéspedes" onclick="cambiarHuespedes('s-huespedes',-1)" disabled>−</button>
            <input type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" id="s-huespedes" class="contador-num" placeholder="0" data-i18n-aria="widget.huespedes" aria-label="Huéspedes" oninput="escribirHuespedes(this)" onblur="normalizarHuespedes('s-huespedes')">
            <button type="button" class="contador-btn contador-mas" data-i18n-aria="widget.mas" aria-label="Más huéspedes" onclick="cambiarHuespedes('s-huespedes',1)">+</button>
          </div>
          <button type="button" class="huesp-listo" data-i18n="widget.listo" onclick="cerrarDropdowns()">Listo</button>
        </div>
      </div>
    </div>
    <div class="sticky-field">
      <select id="s-tipo">
        <option value="" disabled selected data-i18n-opt="widget.tipo">Tipo de alojamiento</option>
        <option value="" data-i18n-opt="widget.cualquiera">Todos los alojamientos</option>
        <option data-i18n-opt="widget.cabana">Cabaña</option>
        <option data-i18n-opt="widget.habitacion">Habitación</option>
        <option data-i18n-opt="widget.apart">Apart Hotel</option>
        <option data-i18n-opt="widget.casa">Casa</option>
      </select>
      <div class="custom-tipo-wrap" id="s-tipo-wrap">
        <button type="button" class="custom-tipo-trigger" onclick="toggleCustomTipo('s-tipo-wrap')">
          <span id="s-tipo-label" data-i18n="widget.tipo.short">Tipo</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="custom-tipo-opts" id="s-tipo-opts">
          <button type="button" class="custom-tipo-opt" data-index="1" data-abbr="Todos" data-i18n="widget.cualquiera.short" ontouchstart="preTouchCustomTipo(this)" onclick="selectCustomTipo('s-tipo','s-tipo-wrap',this)">Todos</button>
          <button type="button" class="custom-tipo-opt" data-index="2" data-abbr="Cab." data-i18n="widget.cabana" ontouchstart="preTouchCustomTipo(this)" onclick="selectCustomTipo('s-tipo','s-tipo-wrap',this)">Cabaña</button>
          <button type="button" class="custom-tipo-opt" data-index="3" data-abbr="Hab." data-i18n="widget.habitacion" ontouchstart="preTouchCustomTipo(this)" onclick="selectCustomTipo('s-tipo','s-tipo-wrap',this)">Habitación</button>
          <button type="button" class="custom-tipo-opt" data-index="4" data-abbr="Apart" data-i18n="widget.apart" ontouchstart="preTouchCustomTipo(this)" onclick="selectCustomTipo('s-tipo','s-tipo-wrap',this)">Apart Hotel</button>
          <button type="button" class="custom-tipo-opt" data-index="5" data-abbr="Casa" data-i18n="widget.casa" ontouchstart="preTouchCustomTipo(this)" onclick="selectCustomTipo('s-tipo','s-tipo-wrap',this)">Casa</button>
        </div>
      </div>
    </div>
    </div>
    <button class="sticky-btn" onclick="consultarStickyWsp()" data-i18n="sticky.btn">Buscar</button>
</div>
  <div id="sticky-error"></div>
</div>

<!-- ============================================================ HERO -->
<section class="hero" id="inicio">
  <div class="hero-bg">
    <img id="hero-main-img"
      src="/fotos/general/1.webp"
      alt="Hotel y Cabañas Brisas de Oro en Villa Carlos Paz, Córdoba" data-i18n-alt="alt.hero"
      style="object-position: center 45%;">
  </div>
  <div class="hero-overlay"></div>

  <!-- Texto centrado -->
  <div class="hero-content">
    <div class="hero-text">
      <h1 class="hero-eyebrow" data-i18n="hero.eyebrow">Hotel y Cabañas en Villa Carlos Paz</h1>
      <p class="hero-title" data-i18n="hero.title">Viví <em>momentos inolvidables</em></p>
      <p id="hero-desc-desktop" class="hero-desc solo-desktop" data-i18n="hero.desc">Complejo familiar atendido por sus dueños, donde el trato personalizado y el clima hogareño hacen que cada huésped se sienta en casa. Rodeados de las sierras cordobesas y a orillas del río San Antonio, en Villa&nbsp;Carlos&nbsp;Paz.</p>
      <p id="hero-desc-mobile" class="hero-desc solo-mobile" style="display:none" data-i18n="hero.descMobile">Complejo familiar atendido por sus dueños, donde el trato personalizado y el clima hogareño hacen que cada huésped se sienta en casa. Rodeados de las sierras cordobesas y a orillas del río San Antonio, en Villa&nbsp;Carlos&nbsp;Paz.</p>
      <div class="hero-badges hero-badges--es">
        <span class="badge" data-i18n="hero.b1" data-abbr-mobile="Familiar" data-abbr-mobile-i18n="hero.b1.abbr">Ambiente familiar</span>
        <span class="badge" data-i18n="hero.b2">Desayuno buffet</span>
        <span class="badge" data-i18n="hero.b3">Pileta</span>
        <span class="badge" data-i18n="hero.b4">Pet friendly</span>
      </div>
    </div>
    <div id="hero-widget">
      <p class="widget-title" data-i18n="widget.title">Consultar disponibilidad</p>
      <p class="widget-sub" data-i18n="widget.sub">Encontrá tu espacio ideal y contactanos para confirmar</p>
      <div class="widget-grid">
        <div class="widget-field">
          <label for="fecha-llegada" data-i18n="widget.llegada">Llegada</label>
          <div class="date-wrap" id="wrap-llegada">
            <span class="date-ph" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span class="date-ph-txt">dd/mm/aaaa</span></span>
            <input type="date" id="fecha-llegada" onchange="actualizarFechaPh(this)">
          </div>
        </div>
        <div class="widget-field">
          <label for="fecha-salida" data-i18n="widget.salida">Salida</label>
          <div class="date-wrap" id="wrap-salida">
            <span class="date-ph" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span class="date-ph-txt">dd/mm/aaaa</span></span>
            <input type="date" id="fecha-salida" onchange="actualizarFechaPh(this)">
          </div>
        </div>
        <div class="widget-field">
          <label for="huespedes" data-i18n="widget.huespedes">Huéspedes</label>
          <div class="contador">
            <button type="button" class="contador-btn contador-menos" data-i18n-aria="widget.menos" aria-label="Menos huéspedes" onclick="cambiarHuespedes('huespedes',-1)" disabled>−</button>
            <input type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" id="huespedes" class="contador-num" placeholder="Huéspedes" data-i18n-ph="widget.huespedes" data-i18n-aria="widget.huespedes" aria-label="Huéspedes" oninput="escribirHuespedes(this)" onblur="normalizarHuespedes('huespedes')">
            <button type="button" class="contador-btn contador-mas" data-i18n-aria="widget.mas" aria-label="Más huéspedes" onclick="cambiarHuespedes('huespedes',1)">+</button>
          </div>
        </div>
        <div class="widget-field">
          <label for="tipo-aloj" class="label-abbr" data-i18n="widget.tipo" data-abbr-mobile="Alojamiento" data-abbr-mobile-i18n="widget.tipo.abbr">Tipo de alojamiento</label>
          <select id="tipo-aloj">
            <option value="" data-i18n-opt="widget.cualquiera">Todos los alojamientos</option>
            <option data-i18n-opt="widget.cabana">Cabaña</option>
            <option data-i18n-opt="widget.habitacion">Habitación</option>
            <option data-i18n-opt="widget.apart">Apart Hotel</option>
            <option data-i18n-opt="widget.casa">Casa</option>
          </select>
          <div class="custom-tipo-wrap" id="tipo-aloj-wrap">
            <button type="button" class="custom-tipo-trigger" onclick="toggleCustomTipo('tipo-aloj-wrap')">
              <span id="tipo-aloj-label">Todos</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div class="custom-tipo-opts" id="tipo-aloj-opts">
              <button type="button" class="custom-tipo-opt active" data-index="0" data-i18n="widget.cualquiera.short" ontouchstart="preTouchCustomTipo(this)" onclick="selectCustomTipo('tipo-aloj','tipo-aloj-wrap',this)">Todos</button>
              <button type="button" class="custom-tipo-opt" data-index="1" data-i18n="widget.cabana" ontouchstart="preTouchCustomTipo(this)" onclick="selectCustomTipo('tipo-aloj','tipo-aloj-wrap',this)">Cabaña</button>
              <button type="button" class="custom-tipo-opt" data-index="2" data-i18n="widget.habitacion" ontouchstart="preTouchCustomTipo(this)" onclick="selectCustomTipo('tipo-aloj','tipo-aloj-wrap',this)">Habitación</button>
              <button type="button" class="custom-tipo-opt" data-index="3" data-i18n="widget.apart" ontouchstart="preTouchCustomTipo(this)" onclick="selectCustomTipo('tipo-aloj','tipo-aloj-wrap',this)">Apart Hotel</button>
              <button type="button" class="custom-tipo-opt" data-index="4" data-i18n="widget.casa" ontouchstart="preTouchCustomTipo(this)" onclick="selectCustomTipo('tipo-aloj','tipo-aloj-wrap',this)">Casa</button>
            </div>
          </div>
        </div>
      </div>
      <p id="hero-fecha-error">⚠ Fecha no válida. Por favor seleccioná una fecha a partir del día de hoy.</p>
      <button class="btn-consultar" onclick="consultarWhatsApp()" data-i18n="widget.btn">Ver disponibilidad</button>
      <p class="widget-note"><span data-i18n="widget.note.a">Sin pagos online</span><span class="widget-note-sep"> · </span><span data-i18n="widget.note.b">Confirmamos directamente por WhatsApp</span></p>
    </div>
  </div>

  <!-- Puntos indicadores -->
  <div style="position:absolute;bottom:1.75rem;left:50%;transform:translateX(-50%);z-index:3;display:flex;gap:8px;align-items:center;" id="hero-dots">
    <span class="hero-dot active" onclick="cambiarFotoHero(0)"></span>
    <span class="hero-dot" onclick="cambiarFotoHero(1)"></span>
    <span class="hero-dot" onclick="cambiarFotoHero(2)"></span>
    <span class="hero-dot" onclick="cambiarFotoHero(3)"></span>
  </div>
</section>

<!-- ============================================================ NOSOTROS -->
<section id="nosotros" class="sec-blanco">
  <div class="section-inner">
    <div class="nosotros-grid">
      <div class="nosotros-img-wrap">
        <img loading="lazy" decoding="async" src="/fotos/general/5.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo">
        <div class="nosotros-img-badge">
          <p data-i18n="nosotros.badge1">Atendido por sus dueños</p>
          <span data-i18n="nosotros.badge2">María Celia, anfitriona</span>
        </div>
      </div>
      <div class="nosotros-text">
        <p class="section-label" data-i18n="nosotros.label">Quiénes somos</p>
        <h2 class="section-title" data-i18n="nosotros.title">Un lugar donde cada huésped es parte de la familia</h2>
        <div class="divider"></div>
        <p data-i18n="nosotros.p1">Somos un complejo familiar ubicado en Villa Carlos Paz, atendido directamente por sus dueños. Desde el primer contacto hasta el momento de la despedida, nos ocupamos personalmente de que tu estadía sea cómoda, tranquila y especial.</p>
        <p data-i18n="nosotros.p2">Cada detalle importa: el desayuno casero preparado con amor, el saludo al llegar, la charla de tarde. Son esas pequeñas cosas las que hacen que nuestros huéspedes se vayan con una sonrisa y quieran volver.</p>
          <p data-i18n="nosotros.p3">En el corazón del complejo se encuentra El Algarrobo — nuestro espacio compartido bajo la sombra de un algarrobo bicentenario. Parrilleros, mesas y el sonido de la naturaleza, para que cada reunión sea un momento especial.</p>
        <div class="highlight-box">
          <p data-i18n="nosotros.quote"><span class="cita-linea">"Más que una estadía, un recuerdo</span><span class="cita-linea">que se lleva en el corazón."</span></p>
        </div>
        <div class="info-chips">
          <span class="chip" data-i18n="nosotros.c1">Atención personalizada</span>
          <span class="chip" data-i18n="nosotros.c2">Ubicación estratégica</span>
          <span class="chip" data-i18n="nosotros.c3">Flexibilidad y comodidad</span>
          <span class="chip" data-i18n="nosotros.c4">16 unidades</span>
          <span class="chip" data-i18n="nosotros.c5">Atendido por la familia</span>
          <span class="chip" data-i18n="nosotros.c6">El Algarrobo</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ NUESTRAS FAMILIAS -->
<section class="sec-crema-a" style="padding: 4rem 6%;">
  <div class="section-inner">
    <div style="text-align:center; margin-bottom:2.5rem;">
      <p class="section-label" data-i18n="fam.label">Nuestras familias</p>
      <h2 class="section-title" data-i18n="fam.title"><span class="fam-title-line">Cada despedida</span> <span class="fam-title-line">es un hasta pronto</span></h2>
      <div class="divider" style="margin:0.9rem auto 0;"></div>
      <p style="font-size:0.9rem;color:var(--texto-suave);max-width:520px;margin:1rem auto 0;line-height:1.75;">
        <span data-i18n="fam.desc">Las familias que nos eligieron son parte de nuestra historia. Cada visita deja una huella que nos hace querer seguir dando lo mejor.</span>
      </p>
    </div>

    <div class="familias-wrap" style="position:relative;">
      <button class="familias-arrow left" id="fam-prev" onclick="moverFamilias(-1)" disabled>&#8249;</button>

      <div class="familias-viewport" id="fam-viewport">
        <div class="familias-track" id="fam-track">

          <!-- Foto 1 -->
          <div class="familia-slide">
            <div class="familia-circle">
              <img loading="lazy" decoding="async" src="/fotos/familias/1.webp" alt="Familia de huéspedes durante su estadía en Brisas de Oro" data-i18n-alt="alt.familia"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="familia-circle-placeholder" style="display:none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>fotos/familias/1.webp</span>
              </div>
            </div>
          </div>

          <!-- Foto 2 -->
          <div class="familia-slide">
            <div class="familia-circle">
              <img loading="lazy" decoding="async" src="/fotos/familias/2.webp" alt="Familia de huéspedes durante su estadía en Brisas de Oro" data-i18n-alt="alt.familia"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="familia-circle-placeholder" style="display:none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>fotos/familias/2.webp</span>
              </div>
            </div>
          </div>

          <!-- Foto 3 -->
          <div class="familia-slide">
            <div class="familia-circle">
              <img loading="lazy" decoding="async" src="/fotos/familias/3.webp" alt="Familia de huéspedes durante su estadía en Brisas de Oro" data-i18n-alt="alt.familia"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="familia-circle-placeholder" style="display:none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>fotos/familias/3.webp</span>
              </div>
            </div>
          </div>

          <!-- Foto 4 -->
          <div class="familia-slide">
            <div class="familia-circle">
              <img loading="lazy" decoding="async" src="/fotos/familias/4.webp" alt="Familia de huéspedes durante su estadía en Brisas de Oro" data-i18n-alt="alt.familia"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="familia-circle-placeholder" style="display:none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>fotos/familias/4.webp</span>
              </div>
            </div>
          </div>

          <!-- Foto 5 -->
          <div class="familia-slide">
            <div class="familia-circle">
              <img loading="lazy" decoding="async" src="/fotos/familias/5.webp" alt="Familia de huéspedes durante su estadía en Brisas de Oro" data-i18n-alt="alt.familia"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="familia-circle-placeholder" style="display:none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>fotos/familias/5.webp</span>
              </div>
            </div>
          </div>

          <!-- Foto 6 -->
          <div class="familia-slide">
            <div class="familia-circle">
              <img loading="lazy" decoding="async" src="/fotos/familias/6.webp" alt="Familia de huéspedes durante su estadía en Brisas de Oro" data-i18n-alt="alt.familia"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
              <div class="familia-circle-placeholder" style="display:none">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>fotos/familias/6.webp</span>
              </div>
            </div>
          </div>

        </div><!-- /fam-track -->
      </div><!-- /fam-viewport -->

      <button class="familias-arrow right" id="fam-next" onclick="moverFamilias(1)">&#8250;</button>
    </div>

    <div class="familias-dots" id="fam-dots"></div>
  </div>
</section>

<!-- ============================================================ GALERÍA -->
<section class="sec-blanco" style="padding: 4rem 6%;">
  <div class="section-inner">
    <div style="text-align:center; margin-bottom:2.5rem;">
      <p class="section-label" data-i18n="casa.label">Nuestra casa</p>
      <h2 class="section-title" data-i18n="casa.title">También es tu casa</h2>
      <div class="divider" style="margin:0.9rem auto 0;"></div>
      <p class="casa-desc" data-i18n="casa.desc">Cada rincón fue pensado para que te sientas cómodo, libre y en familia.<br>Bienvenido a Brisas de Oro.</p>
    </div>

    <div class="familias-wrap" style="position:relative;" id="gal-wrap">
      <button class="familias-arrow left" id="gal-prev" onclick="moverGaleria(-1)" disabled>&#8249;</button>

      <div class="familias-viewport" id="gal-viewport">
        <div class="familias-track" id="gal-track">
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/1.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>1.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/2.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>2.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/3.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>3.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/4.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>4.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/5.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>5.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/6.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>6.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/7.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>7.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/8.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>8.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/9.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>9.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/10.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>10.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/11.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>11.jpg</span></div></div></div>
          <div class="familia-slide"><div class="familia-circle"><img loading="lazy" decoding="async" src="/fotos/general/12.webp" alt="Vista del complejo Brisas de Oro en Villa Carlos Paz" data-i18n-alt="alt.complejo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="familia-circle-placeholder" style="display:none"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg><span>12.jpg</span></div></div></div>
        </div>
      </div>

      <button class="familias-arrow right" id="gal-next" onclick="moverGaleria(1)">&#8250;</button>
    </div>

    <div class="familias-dots" id="gal-dots"></div>
  </div>
</section>

<!-- ============================================================ ALOJAMIENTOS -->
<section id="alojamientos" class="sec-crema-a">
  <div class="section-inner">
    <p class="section-label" data-i18n="aloj.label">Nuestros alojamientos</p>
    <h2 class="section-title" data-i18n="aloj.title">Encontrá tu espacio ideal</h2>
    <div class="divider"></div>
    <div class="aloj-grid">

      <!-- CARD 1 — Cabaña chica -->
      <div class="aloj-card">
        <div class="card-img">
          <div class="card-carousel" id="car-cabana-chica">
            <div class="card-carousel-track">
              <img loading="lazy" decoding="async" src="/fotos/cabana-chica/portada.webp" alt="Cabaña chica para hasta 3 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cchica">
              <img loading="lazy" decoding="async" src="/fotos/cabana-chica/1.webp" alt="Cabaña chica para hasta 3 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cchica">
              <img loading="lazy" decoding="async" src="/fotos/cabana-chica/2.webp" alt="Cabaña chica para hasta 3 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cchica">
              <img loading="lazy" decoding="async" src="/fotos/cabana-chica/3.webp" alt="Cabaña chica para hasta 3 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cchica">
              <img loading="lazy" decoding="async" src="/fotos/cabana-chica/4.webp" alt="Cabaña chica para hasta 3 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cchica">
              <img loading="lazy" decoding="async" src="/fotos/cabana-chica/5.webp" alt="Cabaña chica para hasta 3 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cchica">
            </div>
            <button class="card-arrow prev" onclick="moverCard('car-cabana-chica',-1,event)">&#8249;</button>
            <button class="card-arrow next" onclick="moverCard('car-cabana-chica',1,event)">&#8250;</button>
            <div class="card-dots" id="dots-car-cabana-chica"></div>
            <span class="card-counter" id="counter-car-cabana-chica">1 / 6</span>
          </div>
          <span class="card-type-badge" data-i18n="aloj.tipo1">Cabaña chica</span>
          <div class="card-hover-panel">
            <p class="card-hover-name" data-i18n="aloj.card1.name">Cabaña chica</p>
            <p class="card-hover-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card1.meta1">Hasta 3 personas</span></span> · <span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg><span data-i18n="aloj.card1.meta2">1 dormitorio</span></span></p>
            <a class="btn-consultar-card" href="javascript:void(0)" onclick="abrirWsp(getMsgWsp('cabChica'))" data-i18n="aloj.consultar">Consultar</a>
          </div>
        </div>
        <div class="card-body">
          <p class="card-name" data-i18n="aloj.card1.name">Cabaña chica</p>
          <div class="card-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card1.meta1">Hasta 3 personas</span></span><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg><span data-i18n="aloj.card1.meta2">1 dormitorio</span></span></div>
          <div class="card-features">
            <span class="feature-tag" data-i18n="feat.frio">Aire frío/calor</span>
            <span class="feature-tag" data-i18n="feat.cocina">Cocina equipada</span>
            <span class="feature-tag" data-i18n="feat.asador.priv">Asador privado</span>
            <span class="feature-tag" data-i18n="feat.limp3">Limpieza c/3 días</span>
            <span class="feature-tag" data-i18n="feat.pet">Pet friendly</span>
            <span class="feature-tag" data-i18n="feat.desayuno.opc">Desayuno opcional</span>
          </div>
        </div>
      </div>

      <!-- CARD 2 — Cabaña mediana -->
      <div class="aloj-card">
        <div class="card-img">
          <div class="card-carousel" id="car-cabana-mediana">
            <div class="card-carousel-track">
              <img loading="lazy" decoding="async" src="/fotos/cabana-mediana/portada.webp" alt="Cabaña mediana para 5 a 6 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cmediana">
              <img loading="lazy" decoding="async" src="/fotos/cabana-mediana/1.webp" alt="Cabaña mediana para 5 a 6 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cmediana">
              <img loading="lazy" decoding="async" src="/fotos/cabana-mediana/2.webp" alt="Cabaña mediana para 5 a 6 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cmediana">
              <img loading="lazy" decoding="async" src="/fotos/cabana-mediana/3.webp" alt="Cabaña mediana para 5 a 6 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cmediana">
              <img loading="lazy" decoding="async" src="/fotos/cabana-mediana/4.webp" alt="Cabaña mediana para 5 a 6 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cmediana">
              <img loading="lazy" decoding="async" src="/fotos/cabana-mediana/5.webp" alt="Cabaña mediana para 5 a 6 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cmediana">
              <img loading="lazy" decoding="async" src="/fotos/cabana-mediana/6.webp" alt="Cabaña mediana para 5 a 6 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cmediana">
            </div>
            <button class="card-arrow prev" onclick="moverCard('car-cabana-mediana',-1,event)">&#8249;</button>
            <button class="card-arrow next" onclick="moverCard('car-cabana-mediana',1,event)">&#8250;</button>
            <div class="card-dots" id="dots-car-cabana-mediana"></div>
            <span class="card-counter" id="counter-car-cabana-mediana">1 / 7</span>
          </div>
          <span class="card-type-badge" data-i18n="aloj.tipo2">Cabaña mediana</span>
          <div class="card-hover-panel">
            <p class="card-hover-name" data-i18n="aloj.card2.name">Cabaña mediana</p>
            <p class="card-hover-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card2.meta1">Hasta 5/6 personas</span></span> · <span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg><span data-i18n="aloj.card2.meta2">1 dormitorio</span></span></p>
            <a class="btn-consultar-card" href="javascript:void(0)" onclick="abrirWsp(getMsgWsp('cabMed'))" data-i18n="aloj.consultar">Consultar</a>
          </div>
        </div>
        <div class="card-body">
          <p class="card-name" data-i18n="aloj.card2.name">Cabaña mediana</p>
          <div class="card-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card2.meta1">Hasta 5/6 personas</span></span><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg><span data-i18n="aloj.card2.meta2">1 dormitorio</span></span></div>
          <div class="card-features">
            <span class="feature-tag" data-i18n="feat.ac">Aire acondicionado</span>
            <span class="feature-tag ico-txt"><svg class="ico" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg><span data-i18n="feat.salamandra">Salamandra</span></span>
            <span class="feature-tag" data-i18n="feat.cocina">Cocina equipada</span>
            <span class="feature-tag" data-i18n="feat.asador.priv">Asador privado</span>
            <span class="feature-tag" data-i18n="feat.limp3">Limpieza c/3 días</span>
            <span class="feature-tag" data-i18n="feat.pet">Pet friendly</span>
            <span class="feature-tag" data-i18n="feat.desayuno.opc">Desayuno opcional</span>
          </div>
        </div>
      </div>

      <!-- CARD 3 — Cabaña grande -->
      <div class="aloj-card">
        <div class="card-img">
          <div class="card-carousel" id="car-cabana-grande">
            <div class="card-carousel-track">
              <img loading="lazy" decoding="async" src="/fotos/cabana-grande/portada.webp" alt="Cabaña grande para 7 a 8 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cgrande">
              <img loading="lazy" decoding="async" src="/fotos/cabana-grande/1.webp" alt="Cabaña grande para 7 a 8 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cgrande">
              <img loading="lazy" decoding="async" src="/fotos/cabana-grande/2.webp" alt="Cabaña grande para 7 a 8 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cgrande">
              <img loading="lazy" decoding="async" src="/fotos/cabana-grande/3.webp" alt="Cabaña grande para 7 a 8 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cgrande">
              <img loading="lazy" decoding="async" src="/fotos/cabana-grande/4.webp" alt="Cabaña grande para 7 a 8 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cgrande">
              <img loading="lazy" decoding="async" src="/fotos/cabana-grande/5.webp" alt="Cabaña grande para 7 a 8 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cgrande">
              <img loading="lazy" decoding="async" src="/fotos/cabana-grande/6.webp" alt="Cabaña grande para 7 a 8 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.cgrande">
            </div>
            <button class="card-arrow prev" onclick="moverCard('car-cabana-grande',-1,event)">&#8249;</button>
            <button class="card-arrow next" onclick="moverCard('car-cabana-grande',1,event)">&#8250;</button>
            <div class="card-dots" id="dots-car-cabana-grande"></div>
            <span class="card-counter" id="counter-car-cabana-grande">1 / 7</span>
          </div>
          <span class="card-type-badge" data-i18n="aloj.tipo3">Cabaña grande</span>
          <div class="card-hover-panel">
            <p class="card-hover-name" data-i18n="aloj.card3.name">Cabaña grande</p>
            <p class="card-hover-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card3.meta1">Hasta 7/8 personas</span></span> · <span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg><span data-i18n="aloj.card3.meta2">2 dormitorios</span></span></p>
            <a class="btn-consultar-card" href="javascript:void(0)" onclick="abrirWsp(getMsgWsp('cabGrande'))" data-i18n="aloj.consultar">Consultar</a>
          </div>
        </div>
        <div class="card-body">
          <p class="card-name" data-i18n="aloj.card3.name">Cabaña grande</p>
          <div class="card-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card3.meta1">Hasta 7/8 personas</span></span><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg><span data-i18n="aloj.card3.meta2">2 dormitorios</span></span></div>
          <div class="card-features">
            <span class="feature-tag" data-i18n="feat.frio">Aire frío/calor</span>
            <span class="feature-tag" data-i18n="feat.cocina">Cocina equipada</span>
            <span class="feature-tag" data-i18n="feat.asador.priv">Asador privado</span>
            <span class="feature-tag" data-i18n="feat.limp3">Limpieza c/3 días</span>
            <span class="feature-tag" data-i18n="feat.pet">Pet friendly</span>
            <span class="feature-tag" data-i18n="feat.desayuno.opc">Desayuno opcional</span>
          </div>
        </div>
      </div>

      <!-- CARD 4 — Habitaciones de hotel -->
      <div class="aloj-card">
        <div class="card-img">
          <div class="card-carousel" id="car-habitaciones">
            <div class="card-carousel-track">
              <img loading="lazy" decoding="async" src="/fotos/habitaciones/portada.webp" alt="Habitación de hotel en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.hab">
              <img loading="lazy" decoding="async" src="/fotos/habitaciones/1.webp" alt="Habitación de hotel en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.hab">
              <img loading="lazy" decoding="async" src="/fotos/habitaciones/2.webp" alt="Habitación de hotel en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.hab">
              <img loading="lazy" decoding="async" src="/fotos/habitaciones/3.webp" alt="Habitación de hotel en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.hab">
              <img loading="lazy" decoding="async" src="/fotos/habitaciones/4.webp" alt="Habitación de hotel en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.hab">
              <img loading="lazy" decoding="async" src="/fotos/habitaciones/5.webp" alt="Habitación de hotel en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.hab">
              <img loading="lazy" decoding="async" src="/fotos/habitaciones/6.webp" alt="Habitación de hotel en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.hab">
              <img loading="lazy" decoding="async" src="/fotos/habitaciones/7.webp" alt="Habitación de hotel en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.hab">
            </div>
            <button class="card-arrow prev" onclick="moverCard('car-habitaciones',-1,event)">&#8249;</button>
            <button class="card-arrow next" onclick="moverCard('car-habitaciones',1,event)">&#8250;</button>
            <div class="card-dots" id="dots-car-habitaciones"></div>
            <span class="card-counter" id="counter-car-habitaciones">1 / 8</span>
          </div>
          <span class="card-type-badge" data-i18n="aloj.tipo4">Hotel</span>
          <div class="card-hover-panel">
            <p class="card-hover-name" data-i18n="aloj.card4.name">Habitaciones de hotel</p>
            <p class="card-hover-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card4.meta1">1–4 personas</span></span> · <span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card4.meta1">1–4 personas</span></span><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="7" y1="19" x2="7" y2="21"/><line x1="17" y1="19" x2="17" y2="21"/></svg><span data-i18n="aloj.card4.body2">Baño privado</span></span></p>
            <a class="btn-consultar-card" href="javascript:void(0)" onclick="abrirWsp(getMsgWsp('habit'))" data-i18n="aloj.consultar">Consultar</a>
          </div>
        </div>
        <div class="card-body">
          <p class="card-name" data-i18n="aloj.card4.name">Habitaciones de hotel</p>
          <div class="card-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card4.meta1">1–4 personas</span></span><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" y1="5" x2="8" y2="7"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="7" y1="19" x2="7" y2="21"/><line x1="17" y1="19" x2="17" y2="21"/></svg><span data-i18n="aloj.card4.body2">Baño privado</span></span></div>
          <div class="variant-chips" style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.7rem">
            <span class="variant-chip" data-i18n="aloj.card4.v1">Doble</span>
            <span class="variant-chip" data-i18n="aloj.card4.v2">Triple</span>
            <span class="variant-chip" data-i18n="aloj.card4.v3">Cuádruple</span>
          </div>
          <div class="card-features">
            <span class="feature-tag" data-i18n="feat.ac24">Aire frío/calor 24 hs</span>
            <span class="feature-tag" data-i18n="feat.heladera">Heladera privada</span>
            <span class="feature-tag" data-i18n="feat.asador.comp">Asador compartido</span>
            <span class="feature-tag" data-i18n="feat.limp1">Limpieza diaria</span>
            <span class="feature-tag" data-i18n="feat.desayuno.opc">Desayuno opcional</span>
          </div>
        </div>
      </div>

      <!-- CARD 5 — Apart Hotel -->
      <div class="aloj-card">
        <div class="card-img">
          <div class="card-carousel" id="car-apart">
            <div class="card-carousel-track">
              <img loading="lazy" decoding="async" src="/fotos/apart-hotel/portada.webp" alt="Apart hotel para hasta 5 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.apart">
              <img loading="lazy" decoding="async" src="/fotos/apart-hotel/1.webp" alt="Apart hotel para hasta 5 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.apart">
              <img loading="lazy" decoding="async" src="/fotos/apart-hotel/2.webp" alt="Apart hotel para hasta 5 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.apart">
              <img loading="lazy" decoding="async" src="/fotos/apart-hotel/3.webp" alt="Apart hotel para hasta 5 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.apart">
              <img loading="lazy" decoding="async" src="/fotos/apart-hotel/4.webp" alt="Apart hotel para hasta 5 personas en Brisas de Oro, Villa Carlos Paz" data-i18n-alt="alt.apart">
            </div>
            <button class="card-arrow prev" onclick="moverCard('car-apart',-1,event)">&#8249;</button>
            <button class="card-arrow next" onclick="moverCard('car-apart',1,event)">&#8250;</button>
            <div class="card-dots" id="dots-car-apart"></div>
            <span class="card-counter" id="counter-car-apart">1 / 5</span>
          </div>
          <span class="card-type-badge" data-i18n="aloj.tipo5">Apart Hotel</span>
          <div class="card-hover-panel">
            <p class="card-hover-name" data-i18n="aloj.card5.name">Apart Hotel</p>
            <p class="card-hover-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card5.meta1">Hasta 4/5 personas</span></span> · <span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span data-i18n="aloj.card5.body2">2 hab. con baño privado</span></span></p>
            <a class="btn-consultar-card" href="javascript:void(0)" onclick="abrirWsp(getMsgWsp('apart'))" data-i18n="aloj.consultar">Consultar</a>
          </div>
        </div>
        <div class="card-body">
          <p class="card-name" data-i18n="aloj.card5.name">Apart Hotel</p>
          <div class="card-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card5.meta1">Hasta 4/5 personas</span></span><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span data-i18n="aloj.card5.body2">2 hab. con baño privado</span></span></div>
          <div class="card-features">
            <span class="feature-tag" data-i18n="feat.ac24">Aire frío/calor 24 hs</span>
            <span class="feature-tag" data-i18n="feat.minicocina">Mini cocina equipada</span>
            <span class="feature-tag" data-i18n="feat.heladera">Heladera privada</span>
            <span class="feature-tag" data-i18n="feat.asador.comp">Asador compartido</span>
            <span class="feature-tag" data-i18n="feat.limp1">Limpieza diaria</span>
            <span class="feature-tag" data-i18n="feat.desayuno.opc">Desayuno opcional</span>
          </div>
        </div>
      </div>

      <!-- CARD 6 — Casa con Pileta · Icho Cruz (fuera del complejo) -->
      <div class="aloj-card">
        <div class="card-img">
          <div class="card-carousel" id="car-casa">
            <div class="card-carousel-track">
              <img loading="lazy" decoding="async" src="/fotos/casa/portada.webp" alt="Casa con pileta en Icho Cruz para hasta 10 personas" data-i18n-alt="alt.casa">
              <img loading="lazy" decoding="async" src="/fotos/casa/1.webp" alt="Casa con pileta en Icho Cruz para hasta 10 personas" data-i18n-alt="alt.casa">
              <img loading="lazy" decoding="async" src="/fotos/casa/2.webp" alt="Casa con pileta en Icho Cruz para hasta 10 personas" data-i18n-alt="alt.casa">
              <img loading="lazy" decoding="async" src="/fotos/casa/3.webp" alt="Casa con pileta en Icho Cruz para hasta 10 personas" data-i18n-alt="alt.casa">
              <img loading="lazy" decoding="async" src="/fotos/casa/4.webp" alt="Casa con pileta en Icho Cruz para hasta 10 personas" data-i18n-alt="alt.casa">
              <img loading="lazy" decoding="async" src="/fotos/casa/5.webp" alt="Casa con pileta en Icho Cruz para hasta 10 personas" data-i18n-alt="alt.casa">
            </div>
            <button class="card-arrow prev" onclick="moverCard('car-casa',-1,event)">&#8249;</button>
            <button class="card-arrow next" onclick="moverCard('car-casa',1,event)">&#8250;</button>
            <div class="card-dots" id="dots-car-casa"></div>
            <span class="card-counter" id="counter-car-casa">1 / 6</span>
          </div>
          <span class="card-type-badge" data-i18n="aloj.tipo6">Casa · Icho Cruz</span>
          <div class="card-hover-panel">
            <p class="card-hover-name" data-i18n="aloj.card6.name">Casa con Pileta · Icho Cruz</p>
            <p class="card-hover-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card6.meta1">Hasta 10 personas</span></span> · <span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg><span data-i18n="aloj.card6.meta2">3 dormitorios</span></span></p>
            <a class="btn-consultar-card" href="javascript:void(0)" onclick="abrirWsp(getMsgWsp('casa'))" data-i18n="aloj.consultar">Consultar</a>
          </div>
        </div>
        <div class="card-body">
          <p class="card-name" data-i18n="aloj.card6.name">Casa con Pileta · Icho Cruz</p>
          <div class="card-meta"><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="aloj.card6.meta1">Hasta 10 personas</span></span><span class="ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg><span data-i18n="aloj.card6.meta2">3 dormitorios</span></span></div>
          <div class="card-features">
            <span class="feature-tag" data-i18n="feat.pileta.priv">Pileta privada</span>
            <span class="feature-tag" data-i18n="feat.parque.priv">Parque privado</span>
            <span class="feature-tag" data-i18n="feat.asador.priv">Asador privado</span>
            <span class="feature-tag" data-i18n="feat.cocina">Cocina equipada</span>
            <span class="feature-tag" data-i18n="feat.wifi.tv">Wi-Fi y DirecTV</span>
            <span class="feature-tag" data-i18n="feat.pet">Pet friendly</span>
          </div>
          <p class="card-nota"><span class="card-nota-linea" data-i18n="aloj.card6.noincluye.a">Sin desayuno ni toallas</span><span class="card-nota-linea" data-i18n="aloj.card6.noincluye.b">Ropa de cama opcional (con cargo adicional)</span></p>
          <p class="card-nota ico-txt"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span data-i18n="aloj.card6.ubic">Icho Cruz — a 15 min de Brisas de Oro</span></p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Franja de transición hacia información importante -->
<div style="background:var(--crema-b);border-top:1px solid var(--borde);border-bottom:1px solid var(--borde);padding:1.25rem 5%;text-align:center;">
  <div onclick="scrollToId('antes-de-reservar')" style="display:inline-flex;flex-direction:column;align-items:center;gap:0.5rem;text-decoration:none;color:var(--texto-medio);cursor:pointer;">
    <span data-i18n="aloj.franja" style="font-family:'Nunito',sans-serif;font-size:0.82rem;font-weight:600;letter-spacing:0.03em;">¿Te interesa algún alojamiento? Antes de consultar, te recomendamos leer la <span style="color:var(--oro);font-weight:700;">información importante</span></span>
    <svg class="bounce-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--oro)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  </div>
</div>

<!-- ============================================================ ANTES DE RESERVAR -->
<section id="antes-de-reservar" class="sec-blanco" style="padding: 3rem 5% 4rem;">
  <div class="section-inner" style="max-width:860px;">
    <div style="text-align:center;margin-bottom:2rem;">
      <p class="section-label" data-i18n="info.label">Información importante</p>
      <h2 class="section-title" data-i18n="info.title">Antes de reservar, leé esto</h2>
      <div class="divider" style="margin:0.9rem auto 0;"></div>
    </div>

    <div class="acordeon" id="acordeon">

      <!-- 1. Condiciones de reserva -->
      <div class="acord-item">
        <button class="acord-header" onclick="toggleAcord(this)">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 2v4M8 2v4M2 10h20"/></svg>
            <span data-i18n="acord.res.title">Condiciones de reserva</span>
          </span>
          <svg class="acord-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="acord-body">
          <div class="acord-grid">
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.res.l1">Seña</span><span data-i18n="acord.res.v1">50% anticipado para confirmar la reserva · El saldo restante se abona al ingreso</span></div>
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.res.l2">Estadía mínima</span><span data-i18n="acord.res.v2">Variable según temporada — consultanos por disponibilidad</span></div>
          </div>
        </div>
      </div>

      <!-- 2. Política de cancelación -->
      <div class="acord-item">
        <button class="acord-header" onclick="toggleAcord(this)">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span data-i18n="acord.cancel.title">Política de cancelación</span>
          </span>
          <svg class="acord-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="acord-body">
          <p data-i18n="acord.cancel.txt"><strong>Cancelación flexible — seña reutilizable.</strong> Ante la cancelación del huésped, el importe abonado como seña se asignará como crédito en pesos para utilizar en una futura reserva. Debe realizarse dentro de los 6 meses siguientes y estará sujeta a disponibilidad.</p>
        </div>
      </div>

      <!-- 3. Aire acondicionado — destacado -->
      <div class="acord-item acord-destacado">
        <button class="acord-header" onclick="toggleAcord(this)">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>
            <span data-i18n="acord.ac.title">Aire acondicionado — importante</span>
          </span>
          <svg class="acord-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="acord-body">
          <div class="acord-grid">
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.ac.l1">Cabañas</span><span data-i18n="acord.ac.v1">Habilitado de 12:00 a 17:00 hs incluido en la tarifa. Fuera de ese horario tiene un costo adicional — consultanos al reservar.</span></div>
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.ac.l2">Habitaciones y Apart Hotel</span><span data-i18n="acord.ac.v2">Aire acondicionado disponible las 24 hs sin cargo adicional.</span></div>
          </div>
        </div>
      </div>

      <!-- 4. Horarios -->
      <div class="acord-item">
        <button class="acord-header" onclick="toggleAcord(this)">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span data-i18n="acord.hora.title">Horarios de ingreso y egreso</span>
          </span>
          <svg class="acord-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="acord-body">
          <div class="acord-grid">
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.hora.l1">Check-in</span><span data-i18n="acord.hora.v1">A partir de las 13:00 hs</span></div>
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.hora.l2">Check-out</span><span data-i18n="acord.hora.v2">Hasta las 10:00 hs</span></div>
          </div>
          <p style="margin-top:0.75rem;font-size:0.85rem;color:var(--texto-medio)" data-i18n="acord.hora.casa">Casa con Pileta · Icho Cruz: check-in 14:00 hs · check-out 10:00 hs</p>
          <p style="margin-top:0.75rem;font-size:0.85rem;color:var(--texto-suave)" data-i18n="acord.hora.note">Los horarios son flexibles según disponibilidad. Consultanos si necesitás un horario especial.</p>
        </div>
      </div>

      <!-- 5. Normas -->
      <div class="acord-item">
        <button class="acord-header" onclick="toggleAcord(this)">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            <span data-i18n="acord.normas.title">Normas del alojamiento</span>
          </span>
          <svg class="acord-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="acord-body">
          <div class="acord-grid">
            <div class="acord-dato">
              <span class="acord-label" style="color:#4caf50" data-i18n="acord.normas.si">✓ Se acepta</span>
              <span data-i18n="acord.normas.si.v">Familias · Parejas · Grupos de jóvenes · Niños · Bebés · Personas con movilidad reducida · Mascotas <em>(solo en cabañas)</em> · Visitas <em>(con costo adicional en temporada alta)</em></span>
            </div>
            <div class="acord-dato">
              <span class="acord-label" style="color:#e53935" data-i18n="acord.normas.no">✗ No se permite</span>
              <span data-i18n="acord.normas.no.v">Fumar en espacios interiores · Fiestas · Música alta · Ingreso de personas no registradas en la reserva</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 6. Garantía -->
      <div class="acord-item">
        <button class="acord-header" onclick="toggleAcord(this)">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="12" y2="15"/></svg>
            <span data-i18n="acord.gar.title">Política de garantía</span>
          </span>
          <svg class="acord-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="acord-body">
          <p data-i18n="acord.gar.intro">Se solicita al momento del ingreso:</p>
          <ul style="margin-top:0.5rem;padding-left:1.2rem;color:var(--texto-medio);font-size:0.88rem;line-height:2">
            <li data-i18n="acord.gar.li1">DNI o Pasaporte del titular de la reserva y de todos los integrantes del grupo</li>
            <li data-i18n="acord.gar.li2">Completar la planilla de ingreso con datos personales</li>
            <li data-i18n="acord.gar.li3">Firma de contrato de locación temporal</li>
          </ul>
        </div>
      </div>

      <!-- 7. Formas de pago -->
      <div class="acord-item">
        <button class="acord-header" onclick="toggleAcord(this)">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            <span data-i18n="acord.pago.title">Formas de pago</span>
          </span>
          <svg class="acord-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="acord-body">
          <div class="acord-grid" style="grid-template-columns: repeat(3, 1fr); --acord-cols: 3;">
            <div class="acord-dato"><span class="acord-label" style="white-space:nowrap;" data-i18n="acord.pago.l1">Transferencia</span><span data-i18n="acord.pago.v1">CBU, CVU o Alias disponible al confirmar la reserva (bancos y billeteras virtuales)</span></div>
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.pago.l2">Tarjeta de crédito / débito</span><span data-i18n="acord.pago.v2">Aceptamos tarjetas. Las tarjetas de crédito tienen recargo según la cantidad de cuotas. Consultar al reservar.</span></div>
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.pago.l3">Efectivo</span><span data-i18n="acord.pago.v3">Pesos argentinos y dólares</span></div>
          </div>
        </div>
      </div>



      <!-- 8. Casa con Pileta · Icho Cruz -->
      <div class="acord-item">
        <button class="acord-header" onclick="toggleAcord(this)">
          <span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span data-i18n="acord.casa.title">Casa con Pileta · Icho Cruz</span>
          </span>
          <svg class="acord-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="acord-body acord-body--larga">
          <p style="margin-bottom:0.75rem" data-i18n="acord.casa.intro">Rigen las mismas condiciones de reserva, cancelación, formas de pago y normas que en Brisas de Oro. Lo propio de la casa:</p>
          <div class="acord-grid">
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.casa.l1">Horarios</span><span data-i18n="acord.casa.v1">Check-in 14:00 hs · Check-out 10:00 hs</span></div>
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.casa.l4">Capacidad</span><span data-i18n="acord.casa.v4"><span class="nowrap">Hasta 10 personas ·</span> <span class="nowrap">3 dormitorios ·</span><br class="br-movil"> <span class="nowrap">2 baños</span></span></div>
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.casa.l2">Incluye</span><span data-i18n="acord.casa.v2">Pileta privada, parque privado, asador privado bajo alero, cocina equipada, Wi-Fi y DirecTV, ventiladores. Pet friendly.</span></div>
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.casa.l3">No incluye</span><span data-i18n="acord.casa.v3">Desayuno ni toallas. Ropa de cama opcional, con cargo adicional.</span></div>
            <div class="acord-dato"><span class="acord-label" data-i18n="acord.casa.l5">Dirección</span><span data-i18n="acord.casa.v5"><span class="nowrap">Calle Uruguay,</span> <span class="nowrap">esquina Lombardo,</span><br class="br-movil"> <span class="nowrap">Icho Cruz</span></span>
              <a class="acord-link" href="https://maps.app.goo.gl/LNTt8TeZjFvNtwUY9" target="_blank" rel="noopener"><svg class="ico" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg><span data-i18n="ubic.casa.btn">Cómo llegar</span></a></div>
          </div>
        </div>
      </div>

    </div><!-- /acordeon -->

    <!-- Botón consultar al final -->
    <div style="text-align:center;margin-top:2rem;padding-top:1.75rem;border-top:1px solid var(--borde);">
      <p style="font-size:0.85rem;color:var(--texto-suave);margin-bottom:1rem;" data-i18n="info.cta.note">¿Ya leíste toda la información? Escribinos y te respondemos a la brevedad.</p>
      <a href="javascript:void(0)" onclick="abrirWsp(getMsgWsp('general'))"
         style="display:inline-flex;align-items:center;gap:0.6rem;background:#25D366;color:#fff;text-decoration:none;padding:0.75rem 2rem;border-radius:8px;font-family:'Nunito',sans-serif;font-size:0.85rem;font-weight:700;letter-spacing:0.04em;box-shadow:0 4px 16px rgba(37,211,102,0.3);transition:transform 0.25s,box-shadow 0.25s;"
         onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 24px rgba(37,211,102,0.4)'"
         onmouseout="this.style.transform='';this.style.boxShadow='0 4px 16px rgba(37,211,102,0.3)'">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span data-i18n="info.cta.btn">Consultar por WhatsApp</span>
      </a>
    </div>

  </div>
</section>

<section id="servicios" class="sec-crema-a">
  <div class="section-inner">
    <p class="section-label" data-i18n="serv.label">Lo que ofrecemos</p>
    <h2 class="section-title" data-i18n="serv.title">Nuestros servicios</h2>
    <div class="divider"></div>
    <p class="serv-sub" data-i18n="serv.sub">Servicios disponibles en <span class="serv-sub-nombre">Brisas de Oro Hotel y Cabañas.</span></p>
    <div class="servicios-grid">
      <!-- Pileta -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20M2 16c1.5 1.5 3.5 2 5 2s3.5-.5 5-2 3.5-2 5-2 3.5.5 5 2M7 12V7a5 5 0 0 1 10 0v5"/><circle cx="12" cy="4" r="1"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.pileta">Pileta</p>
        <p class="servicio-desc" data-i18n="serv.pileta.d">Compartida para todos los huéspedes</p>
      </div>
      <!-- Parque -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12M12 12C12 12 8 9 8 5a4 4 0 0 1 8 0c0 4-4 7-4 7z"/><path d="M6 22v-4M6 18c0-2 2-4 2-4M18 22v-4M18 18c0-2-2-4-2-4"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.parque">Parque</p>
        <p class="servicio-desc" data-i18n="serv.parque.d">Amplio y verde</p>
      </div>
      <!-- Cochera -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="22" height="18" rx="2"/><path d="M1 9h22M5 3v6M19 3v6"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/><path d="M5 13h14l-1-4H6l-1 4z"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.cochera">Cochera</p>
        <p class="servicio-desc" data-i18n="serv.cochera.d">Techada y segura</p>
      </div>
      <!-- Asadores -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="7"/><path d="M5.5 6.5 12 13M12 13l6.5-6.5M12 6V2"/><path d="M9 22h6"/><path d="M12 20v2"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.asadores">Asadores</p>
        <p class="servicio-desc" data-i18n="serv.asadores.d">Privado en cada cabaña</p>
      </div>
      <!-- Desayuno -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.desayuno">Desayuno buffet</p>
        <p class="servicio-desc" data-i18n="serv.desayuno.d">Casero, de Celia</p>
      </div>
      <!-- WiFi -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg></div>
        <p class="servicio-nombre">WiFi</p>
        <p class="servicio-desc" data-i18n="serv.wifi.d">Todo el complejo</p>
      </div>
      <!-- Aire acond. -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="8" rx="2"/><path d="M7 11v4M12 11v4M17 11v4M5 19h14M7 15c0 2-1 4-2 4M17 15c0 2 1 4 2 4M12 15v4"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.ac">Aire acond.</p>
        <p class="servicio-desc" data-i18n="serv.ac.d">Frío y calor</p>
      </div>
      <!-- Limpieza -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22v-4l9-9 4 4-9 9H3z"/><path d="m15 5 1.5-1.5a2.121 2.121 0 0 1 3 3L18 8l-3-3z"/><path d="M9.5 14.5 11 16"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.limpieza">Limpieza</p>
        <p class="servicio-desc" data-i18n="serv.limpieza.d">Servicio de mucamas</p>
      </div>
      <!-- El Algarrobo -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12M12 12C12 7 7 4 7 4s1 5 5 8M12 12c0-5 5-8 5-8s-1 5-5 8"/><path d="M8 22h8"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.algarrobo">El Algarrobo</p>
        <p class="servicio-desc" data-i18n="serv.algarrobo.d">Espacio compartido bicentenario</p>
      </div>
      <!-- Juegos para niños -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/><path d="M8 12h8"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.juegos">Juegos para niños</p>
        <p class="servicio-desc" data-i18n="serv.juegos.d">Para jugar y divertirse en familia</p>
      </div>
      <!-- Seguridad -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.seguridad">Seguridad</p>
        <p class="servicio-desc" data-i18n="serv.seguridad.d">Rejas, alarma y cámaras</p>
      </div>
      <!-- Ropa blanca -->
      <div class="servicio-item">
        <div class="servicio-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l9 6 9-6M3 6v12l9 6 9-6V6"/></svg></div>
        <p class="servicio-nombre" data-i18n="serv.ropa">Ropa blanca</p>
        <p class="servicio-desc" data-i18n="serv.ropa.d">Sábanas, toallas y toallones</p>
      </div>
    </div>
  </div>
</section>

<!-- ============================================================ TESTIMONIOS -->
<section id="testimonios" class="sec-blanco">
  <div class="section-inner">

    <!-- Header con título izq + rating + flechas der -->
    <div class="test-header">
      <div class="test-header-left">
        <p class="section-label" data-i18n="test.label">Reseñas</p>
        <h2 class="section-title" data-i18n="test.title">Lo que dicen quienes <span class="titulo-corte">nos visitaron</span></h2>
        <div class="divider" style="margin-bottom:0"></div>
      </div>
      <div style="display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap">
        <div class="rating-total">
          <div class="rating-num">5.0</div>
          <div>
            <span class="rating-stars">★★★★★</span>
            <span class="rating-label" data-i18n="test.rating">Reseñas verificadas · Google y Alquiler Argentina</span>
          </div>
        </div>
        <div class="test-nav">
          <button class="test-arrow" id="test-prev" onclick="moverCarrusel(-1)" disabled aria-label="Anterior">&#8592;</button>
          <button class="test-arrow" id="test-next" onclick="moverCarrusel(1)" aria-label="Siguiente">&#8594;</button>
        </div>
      </div>
    </div>

    <!-- Carrusel -->
    <div class="test-viewport" id="testViewport">
      <div class="test-track" id="testTrack">

        <!-- Columna 1 -->
        <div class="test-col">
          <div class="test-card">
            <div class="stars">★★★★★</div>
            <p class="test-texto" data-i18n="test.r1">"Las cabañas son cómodas, el predio es grande. Es atendida por sus dueños, super amables."</p>
            <div class="test-autor"><div class="test-avatar">DM</div><div><p class="test-nombre">Dianela Melchiorre</p></div></div>
          </div>
          <div class="test-card">
            <div class="stars">★★★★★</div>
            <p class="test-texto" data-i18n="test.r5">"La cabaña estaba impecable, bien equipada y muy cómoda. El trato de los dueños hace la diferencia — te sentís en casa desde que llegás."</p>
            <div class="test-autor"><div class="test-avatar">LG</div><div><p class="test-nombre">Lucas Giménez</p></div></div>
          </div>
        </div>

        <!-- Columna 2 -->
        <div class="test-col">
          <div class="test-card">
            <div class="stars">★★★★★</div>
            <p class="test-texto" data-i18n="test.r2">"Un lugar hermoso, para ir caminando a Playas de Oro. Las cabañas con vista a la pileta, muy cómodas. El desayuno casero de Celia: 10 puntos. Volveríamos sin dudas."</p>
            <div class="test-autor"><div class="test-avatar">DM</div><div><p class="test-nombre">Daiana Magnago</p></div></div>
          </div>
          <div class="test-card">
            <div class="stars">★★★★★</div>
            <p class="test-texto" data-i18n="test.r6">"Hermoso lugar, tranquilo y a pasos del río. El desayuno buffet es lo mejor — casero y abundante. Lo recomiendo a todos los que quieran descansar de verdad."</p>
            <div class="test-autor"><div class="test-avatar">SC</div><div><p class="test-nombre">Sofía Carreras</p></div></div>
          </div>
        </div>

        <!-- Columna 3 -->
        <div class="test-col">
          <div class="test-card">
            <div class="stars">★★★★★</div>
            <p class="test-texto" data-i18n="test.r3">"Excelente atención del personal, siempre dispuesto a ayudar. El complejo está muy bien cuidado y la ubicación es ideal para disfrutar las sierras."</p>
            <div class="test-autor"><div class="test-avatar">MR</div><div><p class="test-nombre">Marcela Roldán</p></div></div>
          </div>
          <div class="test-card">
            <div class="stars">★★★★★</div>
            <p class="test-texto" data-i18n="test.r7">"Muy buena experiencia. El lugar limpio, ordenado y la atención personalizada. Se nota que los dueños disfrutan recibir a la gente."</p>
            <div class="test-autor"><div class="test-avatar">JV</div><div><p class="test-nombre">Jorge Villalba</p></div></div>
          </div>
        </div>

        <!-- Columna 4 -->
        <div class="test-col">
          <div class="test-card">
            <div class="stars">★★★★★</div>
            <p class="test-texto" data-i18n="test.r4">"Fuimos con toda la familia y quedamos encantados. Los chicos disfrutaron muchísimo la pileta y el parque. Sin dudas volvemos el año que viene."</p>
            <div class="test-autor"><div class="test-avatar">FP</div><div><p class="test-nombre">Familia Peralta</p></div></div>
          </div>
          <div class="test-card">
            <div class="stars">★★★★★</div>
            <p class="test-texto" data-i18n="test.r8">"Primera vez que íbamos y ya queremos volver. El río está a dos pasos, la pileta genial y la atención del complejo es increíble. ¡100% recomendable!"</p>
            <div class="test-autor"><div class="test-avatar">AG</div><div><p class="test-nombre">Andrea Godoy</p></div></div>
          </div>
        </div>

        <!-- Columna 5 — visible al deslizar una vez -->
        <div class="test-col">
          <div class="test-card">
            <div class="stars">★★★★★</div>
            <p class="test-texto" data-i18n="test.r9">"El desayuno de Celia no tiene comparación. Rico, abundante y con mucho cariño. El resto del complejo está a la misma altura: impecable."</p>
            <div class="test-autor"><div class="test-avatar">NB</div><div><p class="test-nombre">Natalia Bustos</p></div></div>
          </div>
          <div class="test-card">
            <div class="stars">★★★★★</div>
            <p class="test-texto" data-i18n="test.r10">"Lugar tranquilo, verde y bien ubicado. La cabaña tenía todo lo necesario y el trato fue siempre excelente. Volvemos seguro."</p>
            <div class="test-autor"><div class="test-avatar">RM</div><div><p class="test-nombre">Rodrigo Medina</p></div></div>
          </div>
        </div>


        <!-- Columna 6 — Casa con Pileta · Icho Cruz -->
        <div class="test-col">
          <div class="test-card">
            <div class="test-card-top"><div class="stars">★★★★★</div><span class="feature-tag test-tag" data-i18n="test.casa.tag">Casa · Icho Cruz</span></div>
            <p class="test-texto" data-i18n="test.r11">"Un lugar fantástico, para disfrutar en familia!!! Ubicación muy cómoda para salir para cualquier lado!! Río cerca, y barrio súper tranquilo!!"</p>
            <div class="test-autor"><div class="test-avatar">DA</div><div><p class="test-nombre">Diego Marcelo Acosta</p></div></div>
          </div>
          <div class="test-card">
            <div class="test-card-top"><div class="stars">★★★★★</div><span class="feature-tag test-tag" data-i18n="test.casa.tag">Casa · Icho Cruz</span></div>
            <p class="test-texto" data-i18n="test.r13">"Excelente lugar tranquilo para disfrutar en familia. El río, el centro, la gente, lo recomiendo."</p>
            <div class="test-autor"><div class="test-avatar">N</div><div><p class="test-nombre">N.</p></div></div>
          </div>
        </div>

        <!-- Columna 7 — una sola reseña: la tarjeta ocupa el alto de la columna para no dejar hueco -->
        <div class="test-col test-col--una">
          <div class="test-card">
            <div class="test-card-top"><div class="stars">★★★★★</div><span class="feature-tag test-tag" data-i18n="test.casa.tag">Casa · Icho Cruz</span></div>
            <p class="test-texto" data-i18n="test.r12">"Muy lindo lugar, tranquilo, mucha paz, muy cerca del río y de calle principal donde se puede comprar todo lo necesario. Excelente atención de los dueños."</p>
            <div class="test-autor"><div class="test-avatar">YG</div><div><p class="test-nombre">Yanina Gallegos</p></div></div>
          </div>
        </div>

      </div><!-- /test-track -->
    </div><!-- /test-viewport -->

    <!-- Links a plataformas externas -->
    <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--borde);text-align:center;">
      <p style="font-size:0.7rem;color:var(--texto-suave);margin-bottom:0.9rem;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;" data-i18n="test.plat">También nos encontrás en</p>
      <div class="platform-links">
        <a class="platform-link"
           href="https://www.google.com/maps/search/Brisas+de+Oro+Hotel+y+Caba%C3%B1as+Villa+Carlos+Paz"
           target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
          Google Maps
        </a>
        <a class="platform-link"
           href="https://www.alquilerargentina.com/alojamientos/aw75-Caba%C3%B1a-Hotel-y-Caba%C3%B1as-Brisas-de-Oro-Villa-Carlos-Paz.html"
           target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Alquiler Argentina
        </a>
        <a class="platform-link"
           href="https://www.welcomeargentina.com/villacarlospaz/cabanas-brisas-de-oro.html"
           target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          Welcome Argentina
        </a>
        <a class="platform-link"
           href="https://maps.app.goo.gl/LNTt8TeZjFvNtwUY9"
           target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
          <span data-i18n="test.plat.casa">Reseñas de la Casa en Google</span>
        </a>
      </div>
    </div>

  </div>
</section>

<!-- ============================================================ CLIMA -->
<section id="clima" class="clima-seccion" style="padding:5.5rem 5%">
  <div class="section-inner">
    <div class="clima-header">
      <p class="section-label" data-i18n="clima.label">Villa Carlos Paz · Sierras de Córdoba</p>
      <h2 class="section-title" data-i18n="clima.title">Clima para tu viaje</h2>
      <div class="divider" style="margin:0.9rem auto 1.8rem"></div>
      <p class="clima-desc" style="font-size:0.9rem;color:var(--texto-suave);max-width:700px;margin:0 auto;line-height:1.7;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
        <span data-i18n="clima.desc">Consultá el pronóstico antes de preparar tu equipaje. Datos en tiempo real, actualizados automáticamente.</span>
      </p>
    </div>

    <!-- Contenedor principal -->
    <div id="clima-container">
      <div class="clima-loading">
        <span style="font-size:1.5rem;display:block;margin-bottom:0.5rem">⛅</span>
        Cargando el clima de Villa Carlos Paz...
      </div>
    </div>

    <p class="clima-footer-note" data-i18n="clima.note">Datos provistos por Tomorrow.io · Actualizado automáticamente</p>
  </div>
</section>

<!-- ============================================================ UBICACIÓN -->
<section id="ubicacion" class="sec-blanco">
  <div class="ubicacion-grid">
    <div>
      <p class="section-label" data-i18n="ubic.label">Dónde estamos</p>
      <h2 class="section-title" data-i18n="ubic.title">En plena avenida,<br>rodeados de naturaleza</h2>
      <div class="divider"></div>
      <p style="color:var(--texto-medio);font-size:0.91rem;line-height:1.85;margin-bottom:1rem;margin-top:-0.6rem;" data-i18n="ubic.desc">Ubicados sobre una de las avenidas principales de Villa Carlos Paz, con las sierras como horizonte y&nbsp;el&nbsp;río a pocos pasos.</p>
      <p style="display:flex;align-items:center;gap:0.5rem;font-size:0.82rem;font-weight:600;margin-bottom:1.4rem;">
        <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
          <path d="M5.5 0C2.46 0 0 2.46 0 5.5C0 9.625 5.5 14 5.5 14C5.5 14 11 9.625 11 5.5C11 2.46 8.54 0 5.5 0ZM5.5 7.5C4.395 7.5 3.5 6.605 3.5 5.5C3.5 4.395 4.395 3.5 5.5 3.5C6.605 3.5 7.5 4.395 7.5 5.5C7.5 6.605 6.605 7.5 5.5 7.5Z" fill="var(--oro)"/>
        </svg>
        <a href="https://www.google.com/maps/search/Av.+Ram%C3%B3n+J.+C%C3%A1rcano+2590+Villa+Carlos+Paz" target="_blank"
           style="color:var(--oro);text-decoration:none;border-bottom:1px solid rgba(184,152,42,0.3);transition:color 0.25s;"
           onmouseover="this.style.color='var(--oro-hover)'" onmouseout="this.style.color='var(--oro)'">
          Av. Ramón J. Cárcano 2590, X5152 Villa Carlos Paz
        </a>
      </p>
      <ul class="dist-list">
        <li>
          <!-- Ícono: sol / playa -->
          <span class="dist-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          </span>
          <div class="dist-text">
            <strong data-i18n="ubic.d1a">1 cuadra</strong>
            <span data-i18n="ubic.d1b">Balneario Playas de Oro</span>
          </div>
        </li>
        <li>
          <!-- Ícono: edificios / ciudad -->
          <span class="dist-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 7l9-4 9 4M4 21V7M20 21V7M9 21v-4h6v4M9 10h.01M15 10h.01M9 14h.01M15 14h.01"/></svg>
          </span>
          <div class="dist-text">
            <strong data-i18n="ubic.d3a">25 cuadras · 2,5 km</strong>
            <span data-i18n="ubic.d3b">Centro de Villa Carlos Paz</span>
          </div>
        </li>
        <li>
          <!-- Ícono: avión -->
          <span class="dist-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
          </span>
          <div class="dist-text">
            <strong data-i18n="ubic.d4a">45 minutos</strong>
            <span data-i18n="ubic.d4b">Aeropuerto Internacional de Córdoba</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- Google Maps embed — Av. Ramón J. Cárcano 2590, Villa Carlos Paz -->
    <div style="height:420px;border-radius:10px;overflow:hidden;border:1px solid var(--borde);flex-shrink:0;">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.8!2d-64.4872!3d-31.4285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942d6b4c8b1e2a3d%3A0x0!2sAv.+Ram%C3%B3n+J.+C%C3%A1rcano+2590%2C+X5152+Villa+Carlos+Paz%2C+C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1"
        width="100%" height="100%"
        style="border:0;display:block;"
        allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Hotel y Cabañas Brisas de Oro — Av. Ramón J. Cárcano 2590, Villa Carlos Paz">
      </iframe>
    </div>
  </div>
  <!-- Casa con Pileta · Icho Cruz — alojamiento independiente, fuera del complejo (sin mapa embebido) -->
  <div class="ubic-casa">
    <h3 class="ubic-casa-title" data-i18n="ubic.casa.title">Casa con Pileta · Icho Cruz</h3>
    <div class="divider ubic-casa-divider"></div>
    <p class="ubic-casa-sub" data-i18n="ubic.casa.sub">Alojamiento independiente, fuera del complejo Brisas de Oro.</p>
    <p class="ubic-casa-dir">
      <svg width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
          <path d="M5.5 0C2.46 0 0 2.46 0 5.5C0 9.625 5.5 14 5.5 14C5.5 14 11 9.625 11 5.5C11 2.46 8.54 0 5.5 0ZM5.5 7.5C4.395 7.5 3.5 6.605 3.5 5.5C3.5 4.395 4.395 3.5 5.5 3.5C6.605 3.5 7.5 4.395 7.5 5.5C7.5 6.605 6.605 7.5 5.5 7.5Z" fill="var(--oro)"/>
        </svg>
      <span data-i18n="ubic.casa.dir">Calle Uruguay esq. Lombardo, Icho Cruz</span>
    </p>
    <ul class="dist-list ubic-casa-dist">
      <li>
        <span class="dist-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </span>
        <div class="dist-text">
          <strong data-i18n="ubic.casa.d1a">15 min (9 km)</strong>
          <span data-i18n="ubic.casa.d1b">Brisas de Oro</span>
        </div>
      </li>
      <li>
        <span class="dist-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 7l9-4 9 4M4 21V7M20 21V7M9 21v-4h6v4M9 10h.01M15 10h.01M9 14h.01M15 14h.01"/></svg>
        </span>
        <div class="dist-text">
          <strong data-i18n="ubic.casa.d2a">20 min (13 km)</strong>
          <span data-i18n="ubic.casa.d2b">Centro de Villa Carlos Paz</span>
        </div>
      </li>
      <li>
        <span class="dist-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="15" rx="2"/><path d="M4 11h16M8 18v3M16 18v3"/><circle cx="8" cy="14.5" r="0.8"/><circle cx="16" cy="14.5" r="0.8"/></svg>
        </span>
        <div class="dist-text">
          <strong data-i18n="ubic.casa.d3a">22 min (13,5 km)</strong>
          <span data-i18n="ubic.casa.d3b">Terminal de ómnibus de Carlos Paz</span>
        </div>
      </li>
      <li>
        <span class="dist-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
        </span>
        <div class="dist-text">
          <strong data-i18n="ubic.casa.d4a">1 h (57 km)</strong>
          <span data-i18n="ubic.casa.d4b">Aeropuerto de Córdoba</span>
        </div>
      </li>
    </ul>
    <a class="ubic-casa-btn" href="https://maps.app.goo.gl/LNTt8TeZjFvNtwUY9" target="_blank" rel="noopener">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
      <span data-i18n="ubic.casa.btn">Cómo llegar</span>
    </a>
  </div>
</section>
<div class="cta-banner">
  <h2 data-i18n="cta.title">¿Listo para reservar tus vacaciones?</h2>
  <p data-i18n="cta.sub">Escribinos directo por WhatsApp <span class="cta-linea">y te respondemos al instante.</span></p>
  <a href="javascript:void(0)" onclick="abrirWsp(getMsgWsp('general'))" class="btn-cta-wsp" data-i18n="cta.btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Consultar por WhatsApp
        </a>
</div>

<!-- ============================================================ FOOTER -->
<footer>
  <div class="footer-inner">
    <div class="footer-grid">
      <div>
        <p class="footer-logo">Hotel y Cabañas Brisas de Oro<span>Villa Carlos Paz · Córdoba · Argentina</span></p>
        <p class="footer-desc" data-i18n="footer.desc">Complejo familiar atendido por sus dueños, donde el trato personalizado y el clima hogareño hacen que cada huésped se sienta en casa. Rodeados de las sierras cordobesas y a orillas del río San Antonio.</p>

      </div>
      <div class="footer-col">
        <h4 data-i18n="footer.aloj">Alojamientos</h4>
        <ul>
          <li data-i18n="footer.a1">Cabaña chica (hasta 3 pers.)</li>
          <li data-i18n="footer.a2">Cabaña mediana (hasta 6 pers.)</li>
          <li data-i18n="footer.a3">Cabaña grande (hasta 8 pers.)</li>
          <li data-i18n="footer.a4">Habitaciones de hotel</li>
          <li data-i18n="footer.a5">Apart Hotel</li>
          <li data-i18n="footer.a6">Casa con Pileta · Icho Cruz (hasta 10 pers.)</li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer.info">Información</h4>
        <ul>
          <li data-i18n="footer.checkin">Check-in: 13:00 hs</li>
          <li data-i18n="footer.checkout">Check-out: 10:00 hs</li>
          <li>
            <a href="https://wa.me/543541548053" target="_blank"
               style="color:var(--footer-text);opacity:0.7;text-decoration:none;display:flex;align-items:center;gap:0.4rem;transition:color 0.25s,opacity 0.25s;"
               onmouseover="this.style.color='var(--oro)';this.style.opacity='1'"
               onmouseout="this.style.color='';this.style.opacity='0.7'">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              3541-548053
            </a>
          </li>
          <li>
            <a href="https://www.google.com/maps/search/Av.+Ram%C3%B3n+J.+C%C3%A1rcano+2590+Villa+Carlos+Paz"
               target="_blank"
               style="color:var(--footer-text);opacity:0.7;text-decoration:none;display:flex;align-items:center;gap:0.4rem;transition:color 0.25s,opacity 0.25s;"
               onmouseover="this.style.color='var(--oro)';this.style.opacity='1'"
               onmouseout="this.style.color='';this.style.opacity='0.7'">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              Av. Ramón J. Cárcano 2590
            </a>
          </li>
          <li>
            <a href="https://maps.app.goo.gl/LNTt8TeZjFvNtwUY9"
               target="_blank"
               style="color:var(--footer-text);opacity:0.7;text-decoration:none;display:flex;align-items:center;gap:0.4rem;transition:color 0.25s,opacity 0.25s;"
               onmouseover="this.style.color='var(--oro)';this.style.opacity='1'"
               onmouseout="this.style.color='';this.style.opacity='0.7'">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
              <span data-i18n="footer.casa.dir">Uruguay esq. Lombardo, Icho Cruz</span>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/brisasdeoro" target="_blank"
               style="color:var(--footer-text);opacity:0.7;text-decoration:none;display:flex;align-items:center;gap:0.4rem;transition:color 0.25s,opacity 0.25s;"
               onmouseover="this.style.color='var(--oro)';this.style.opacity='1'"
               onmouseout="this.style.color='';this.style.opacity='0.7'">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              @brisasdeoro
            </a>
          </li>
          <li>
            <a href="mailto:brisasdeoro@gmail.com"
               style="color:var(--footer-text);opacity:0.7;text-decoration:none;display:flex;align-items:center;gap:0.4rem;transition:color 0.25s,opacity 0.25s;"
               onmouseover="this.style.color='var(--oro)';this.style.opacity='1'"
               onmouseout="this.style.color='';this.style.opacity='0.7'">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
              brisasdeoro@gmail.com
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer.tambien">También en</h4>
        <div style="display:flex;flex-direction:column;gap:0.45rem;">
          <a class="platform-link dark"
             href="https://www.google.com/maps/search/Brisas+de+Oro+Hotel+y+Caba%C3%B1as+Villa+Carlos+Paz"
             target="_blank" rel="noopener">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
            Google Maps
          </a>
          <a class="platform-link dark"
             href="https://www.alquilerargentina.com/alojamientos/aw75-Caba%C3%B1a-Hotel-y-Caba%C3%B1as-Brisas-de-Oro-Villa-Carlos-Paz.html"
             target="_blank" rel="noopener">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Alquiler Argentina
          </a>
          <a class="platform-link dark"
             href="https://www.welcomeargentina.com/villacarlospaz/cabanas-brisas-de-oro.html"
             target="_blank" rel="noopener">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            Welcome Argentina
          </a>
          <a class="platform-link dark"
             href="https://maps.app.goo.gl/LNTt8TeZjFvNtwUY9"
             target="_blank" rel="noopener">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
            <span data-i18n="test.plat.casa">Reseñas de la Casa en Google</span>
          </a>
        </div>
      </div>
    </div>
    <hr class="footer-divider">
    <div class="footer-bottom" style="justify-content:center;text-align:center;">
      <p class="solo-desktop">© 2026 Hotel y Cabañas Brisas de Oro · Villa Carlos Paz, Córdoba, Argentina</p>
      <p class="solo-mobile">© 2026 Brisas de Oro · Villa Carlos Paz, Córdoba, Argentina</p>
    </div>
  </div>
</footer>

<!-- ============================================================ JS -->
<a class="wsp-float"
   href="javascript:void(0)"
   onclick="abrirWsp(getMsgWsp('general'))"
   aria-label="Contactar por WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

<div id="fecha-toast">La fecha ingresada no es válida.<br>Seleccioná una fecha a partir del día de hoy.</div>
`
