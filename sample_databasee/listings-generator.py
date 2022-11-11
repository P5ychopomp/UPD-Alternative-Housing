import random
import json

property_name = []
properties = []

for x in range(1,151):                                   # property_id, property_name
    house = 'House' + str(x) 
    property_name.append([x, house])

loyola_heights = ['A. Melchor', 'A. Regidor', 'Alta Vista', 'Aurora Blvd', 'Avelino', 'B. Burgos', 'B. Gonzales', 'C. Salvador', 'College Lane', 'Esteban Abada St', 'F. Collantes', 'F. Dela Rosa', 'Father Arrupe Rd', 'Father Masterson Dr', 'Garcia', 'Guerrero', 'J. Bocobo', 'J. Escaler', 'J. P. Burgos', 'J. P. Laurel', 'Jade', 'Jesuit Residence Lane', 'Jocson', 'Katipunan Ave', 'Laurel', 'M. Delos Santos', 'M. V. Del Rosario', 'Magsaysay', 'Mangyan Rd', 'Marymount', 'Melissa Dr', 'Narra', 'Nicanor Reyes', 'Osmena', 'Pajo', 'Palma', 'Parade loop', 'Park 9', 'President Carlos P. Garcia Ave', 'Quezon', 'Quirino', 'Quisumbing Drive', 'Rosa Alvero', 'Roxas', 'Seminary Rd', 'T. Evangelista', 'Thornton Drive', 'Topside Valley', 'University Road', 'Xavierville Ave', 'Zen Garden Path']

commonwealth = ['A. Bonifacio', 'Abelardo', 'Adarna ST', 'Aguinaldo', 'Apple St', 'Bacer St', 'Bach', 'Batasan Rd', 'Bato-Bato St', 'Beethoven', 'Bicoleyte', 'Brahms', 'Caridad', 'Chopin', 'Commonwealth Ave', 'Cuenco St', 'D. Carmencita', 'Dear St', 'Debussy', 'Don Benedicto', 'Don Desiderio Ave', 'Don Espejo Ave', 'Don Fabian', 'Don Jose Ave', 'Don Macario', 'Dona Adaucto', 'Dona Agnes', 'Dona Ana Candelaria', 'Dona Carmen Ave', 'Dona Cynthia', 'Dona Fabian Castillo', 'Dona Juliana', 'Dona Lucia', 'Dona Maria', 'Dona Severino', 'Ecol St', 'Elliptical Rd', 'Elma St', 'Ernestine', 'Ernestito', 'Eulogio St', 'Freedom Park', 'Gen. Evangelista', 'Gen. Ricarte', 'Geraldine St', 'Gold St', 'Grapes St', 'Handel', 'Hon. B. Soliven', 'Jasmin St', 'Johan St', 'John Street', 'Julius', 'June June', 'Kalapati St', 'Kamagong St', 'Kasoy St', 'Kasunduan', 'Katibayan St', 'Katipunan St', 'Katuparan', 'Kaunlaran', 'Kilyawan St', 'La Mesa Drive', 'Laurel St', 'Lawin St', 'Liszt', 'Lunas St', 'Ma Theresa', 'Mango', 'Manila Gravel Pit Rd', 'Mark Street', 'Markos Rd', 'Martan St', 'Martirez St', 'Matthew St', 'Melon', 'Mozart', 'Obanc St', 'Ocampo Ave', 'Odigal', 'Pacamara St', 'Pantaleona', 'Paul St', 'Payatas Rd', 'Perez St', 'Pilot Drive', 'Pineapple St', 'Pres. Osmena', 'Pres. Quezon', 'Pres. Roxas', 'Pugo St', 'Republic Ave', 'Riverside Ext', 'Riverside St', 'Rose St', 'Rossini', 'Saint Anthony Street', 'Saint Paul Street', 'San Andres St', 'San Diego St', 'San Miguel St', 'San Pascual', 'San Pedro', 'Sanchez St', 'Santo Nino Street', 'Santo Rosario Street', 'Schubert', 'Simon St', 'Skinita Shortcut', 'Steve St', 'Sto. Nino', 'Strauss', 'Sumapi Drive', 'Tabigo St', 'Thomas St', 'Verdi', 'Villonco', 'Wagner']

diliman = ['11th Jamboree', 'A. Bautista Street', 'A. Cruz Dr', 'A. Ma Regidor Street', 'A. Mabini St', 'A. Malantic', 'Abenida Epifanio de los Santos', 'Africa St', 'Agham Rd', 'Aglipay St', 'Aguinaldo', 'Alcoy St', 'Angeles Street', 'Anonas Ext', 'B. Baluyot', 'Balagtas St', 'Bantayong Rd', 'BIR Rd', 'C. Arellano', 'C. Icaciano Dr', 'C. Ortinella Dr', 'C. P. Garcia Ave', 'C. V. Francisco', 'Cebu', 'Central Ave', 'Commonwealth Ave', 'Commonwealth Avenue Bike Lane', 'Cotabato Rd', 'D. Castaneda', 'Daan Tubo', 'Dagohoy', 'Dipolog', 'Don. A. Roces Ave', 'Dr Gregorio T. Velasquez', 'Dr. Garcia St', 'E. Jacinto Street', 'E. Ma Guerrero', 'E. Ramos Street', 'East Ave', 'Eugenio Lopez Dr', 'EugenioI. Francisco Alley', 'F. Agoncillo Street', 'F. Maramag', 'Fernandez St', 'Forestry', 'Fr. Martinez', 'Francis S. Sontillano', 'G. Apacible', 'G. Bernardo', 'Gallardo Drive', 'GMA Network Dr', 'Gomburza', 'Gonzales Street', 'H. R. Ocampo', 'I. Delos Reyes Street', 'J. C. De Jesus', 'J. P. Laurel', 'J. Roxas dr', 'Juan Luna', 'Kalayaan Ave', 'Kamias Rd', 'Kamuning Rd', 'Katipunan Ave', 'Kristong Hari', 'Lakandula Street', 'Lands', 'Laurel Ave', 'Legazpi', 'M. Dela Cruz', 'M. Viola Street', 'Maalalahanin', 'Maalindog', 'Maamo', 'Maaralin', 'Maayusin', 'Mabait', 'Mabillis St', 'Mabuhay Street', 'Madasakin Street', 'Magiliw', 'Maginhawa', 'Maginoo', 'Magiting', 'Magsaysay Ave', 'Mahabagin', 'Maharlika', 'Mahiyain', 'Mahusay', 'Makadios', 'Makatarungan Rd', 'Makatarungan Street', 'Makisig St', 'Malakas St', 'Malambing', 'Malamig', 'Malaya', 'Malihim', 'Maliksi St', 'Malinis', 'Malumanay', 'Malusog', 'Maningning', 'Maningo', 'Mapagbigay', 'Mapagkawanggawa', 'Mapagkumbaba', 'Mapagmahal St', 'Mapagsangguni', 'Mapang-akit St', 'Mapayapa', 'Marathon', 'Marunong', 'Masaya', 'Masigasig St', 'Masigla', 'Masigla Ext', 'Masikap', 'Masinsinan St', 'Masunurin', 'Matahimik Street', 'Matalino St', 'Matapat', 'Matatag ST', 'Matimpiin', 'Matimtiman', 'Matino', 'Matipid', 'Matipuno St', 'Matiwasay', 'Matiyaga', 'Matulungin', 'Maunawain', 'Maunlad', 'Maunlad Extension', 'Mayaman', 'Mayumi', 'Mines', 'Mo. Ignacia Ave', 'Naga', 'Nat. Printing Office Rd', 'NIA Rd', 'North Ave', 'Osmena Avenue', 'P. Francisco', 'P. Velasquez Street', 'Panay Ave', 'Pan-Philippine Hwy', 'Path To Mabilis/Maunland', 'Peace Valley', 'Pio Valenzuela Street', 'Plant Industry St', 'President Carlos P. Garcia Ave', 'Purok Aguinaldo', 'Quezon Ave', 'Quirino Avenue', 'R. P. De Guzman', 'Regidor St', 'Ricarte', 'Road 1', 'Road 2', 'Road 3', 'Roces St', 'Roxas', 'S A', 'S AA', 'S E-E', 'S. Flores', 'S. Salvador', 'Saint Francis Street', 'Samar Ave', 'Santos St', 'Scout Borromeo St', 'Scout Fuentebella Extension', 'Scout Limbaga Extension', 'Scout Rallos Extension', 'Scout Santiago', 'Sct. Albano', 'Sct. Castor St', 'Sct. Chuatoco St', 'Sct. De Guia St', 'Sct. Delgado St', 'Sct. Fernandez St', 'Sct. Fuentebella St', 'Sct. Gandia St', 'Sct. Lazcano St', 'Sct. Limbaga St', 'Sct. Lozano St', 'Sct. Madrinan St', 'Sct. Magbanua', 'Sct. Ojeda St', 'Sct. Rallos St', 'Sct. Reyes St', 'Sct. Santiago', 'Sct. Tobias St', 'Sct. Torillo St', 'Sct. Tuason St', 'Sct. Ybardolaza', 'Sgt. Esguerra Ave', 'South J', 'Sto. Nino', 'T. H. Padro De Tavera Street', 'T. M. Kalaw Street', 'Tacloban', 'Tagbbilaran', 'Tandang Saora Ave', 'Tiburcio', 'Timog Ave', 'Tomas Morato Ave', 'Ugnayan Fatima', 'University Ave', 'University Valley', 'V. Luna Ave', 'V. Luna Ext', 'V. Manansala', 'Vic Valley', 'Village A', 'Village B', 'Visayas Ave', 'White House', 'Ylanan Street', 'Zamboanga']

for e in property_name:                 
    e.append(random.randint(1,999))                     # unit_num
    district_rand = random.choice(['loyola_heights', 'commonwealth', 'diliman'])
    if district_rand == 'loyola_heights':  
        e.append(random.choice(loyola_heights))         # street_address
        e.append('Loyola Heights')                      # municip_brgy
    elif district_rand == 'commonwealth':
        e.append(random.choice(commonwealth))
        e.append('Commonwealth')
    else:
        e.append(random.choice(diliman))
        e.append('Diliman')

    e.append('Quezon City')                             # city
    lot_type = random.choice(['Dormitory','Condominium','Apartment','Boarding House'])
    lot_area = random.randrange(15,25,1)
    rate = random.randrange(1000,25000,250)
    min_month_stay = random.choice([6,12,24])
    num_bedrooms = random.randint(1, 3)
    num_bathrooms = random.randint(0, 1)
    occupancy = random.randint(1, 6)
    furnishing = random.choice(['None','Semi', 'Full'])
    curfew = random.randint(0, 1)                       # curfew

    if lot_type == 'Dormitory':
        rate = random.randrange(1000,4000,250)
        num_bedrooms = 1
        min_month_stay = random.choice([6,12])
    elif lot_type == 'Boarding House':
        rate = random.randrange(1000,5000,250)
        num_bedrooms = 1
        min_month_stay = random.choice([6,12])
    elif lot_type == 'Apartment':
        rate = random.randrange(10000,25000,250)
        num_bathrooms = 1
        curfew = 0
        lot_area = random.randrange(20,40,1)
        min_month_stay = random.choice([12,24])
    else:
        rate = random.randrange(10000,25000,250)
        num_bathrooms = 1
        curfew = 0
        min_month_stay = random.choice([12,24])

    e.append(rate)                                      # rate
    e.append(lot_area)                                  # lot_area
    e.append(lot_type)                                  # lot_type
    e.append(min_month_stay)                            # min_month_stay
    e.append(num_bedrooms)                              # num_bedrooms
    e.append(num_bathrooms)
    e.append(occupancy)
    e.append(furnishing)
    e.append(curfew)
    
    date = random.choice(['2022','2023'])               
    month = random.randint(1, 12)
    if month < 10:
        month = '0' + str(month)
    date += '-' + str(month)

    day = random.randint(1, 12)
    if day < 10:
        day = '0' + str(day)
    date += '-' + str(day)
    e.append(date)                                      # date_posted

    d = {}
    d.update({
        'property_id': e[0],
        'property_name': e[1],
        'unit_num': e[2],
        'street_address': e[3],
        'brgy': e[4],
        'city_municip': e[5],
        'rate': e[6],
        'lot_area': e[7],
        'lot_type': e[8],
        'min_month_stay': e[9],
        'num_bedrooms': e[10],
        'num_bathrooms': e[11],
        'occupancy': e[12],
        'furnishing': e[13],
        'curfew': e[14],
        'date_posted': e[15],
    })
    properties.append(d)

with open("sampledatabase.json", "w") as outfile:
    outfile.write(json.dumps(properties, indent=4))

    



    

