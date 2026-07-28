-- Seed gerada a partir do catalogo local atual do Kids Stories.
-- O app continua em modo local; este arquivo apenas popula o Supabase.

BEGIN;

INSERT INTO public.categories (name, description, created_at)
VALUES
  (E'Animais', E'Histórias divertidas com animais', NOW()),
  (E'Fantasia', E'Aventuras mágicas e cheias de encanto', NOW()),
  (E'Espaço', E'Viagens espaciais e descobertas incríveis', NOW()),
  (E'Dinossauros', E'Histórias jurássicas cheias de coragem', NOW()),
  (E'Piratas', E'Mapas, mares e tesouros imaginários', NOW()),
  (E'Natureza', E'Jardins, sementes e segredos da floresta', NOW()),
  (E'Ciência', E'Experimentos curiosos e descobertas brilhantes', NOW())
ON CONFLICT (name) DO UPDATE
SET
  description = EXCLUDED.description;

INSERT INTO public.stories (
  id,
  title,
  description,
  cover_image,
  category_id,
  is_published,
  created_at,
  updated_at
)
VALUES
  (E'beb8697e-7aca-5b90-ac86-454665d3edb5', E'A Raposa que Colecionava Estrelas', E'Uma pequena raposa curiosa parte pela floresta atrás das estrelas que caem toda noite.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/raposa-estrelas.png', (SELECT id FROM public.categories WHERE name = E'Animais'), TRUE, NOW(), NOW()),
  (E'25c39e73-d41e-5b3a-a70d-c2ca3287a5eb', E'O Castelo Acima das Nuvens', E'Duas crianças descobrem uma escada mágica que leva a um castelo flutuante.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/castelo-nuvens.png', (SELECT id FROM public.categories WHERE name = E'Fantasia'), TRUE, NOW(), NOW()),
  (E'89c7fbfe-ff2e-5ebf-a891-e80d0059e1f4', E'O Foguete de Limão', E'Um cientista de 7 anos constrói um foguete no quintal — e ele decola de verdade!', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/foguete-limao.png', (SELECT id FROM public.categories WHERE name = E'Espaço'), TRUE, NOW(), NOW()),
  (E'45a01f17-d4ff-5794-a289-57d078994f11', E'Rex, o Dinossauro Tímido', E'Rex é enorme, mas tem vergonha de rugir. Vai encontrar coragem com um novo amigo?', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/rex-timido.png', (SELECT id FROM public.categories WHERE name = E'Dinossauros'), TRUE, NOW(), NOW()),
  (E'82e84d85-d825-5e05-a15d-62c57dcaf98b', E'Capitã Pérola e o Mapa Perdido', E'Uma jovem capitã cruza sete mares atrás de um tesouro que só existe na sua ideia.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/capita-perola.png', (SELECT id FROM public.categories WHERE name = E'Piratas'), TRUE, NOW(), NOW()),
  (E'5e8fbbc7-50fb-5e75-ba51-bad5d6142cf1', E'A Sementinha Curiosa', E'Uma sementinha decide não esperar a primavera para ver o mundo.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/sementinha-curi.png', (SELECT id FROM public.categories WHERE name = E'Natureza'), TRUE, NOW(), NOW()),
  (E'96e55cac-68fa-5d52-9680-1680edf12801', E'O Laboratório da Luz', E'Descubra por que o céu é azul, com experiências malucas de uma cientista curiosa.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/laboratorio-luz.png', (SELECT id FROM public.categories WHERE name = E'Ciência'), TRUE, NOW(), NOW()),
  (E'b3f7b18e-fde2-5c68-8aff-fcc969bb604e', E'O Urso que Comeu a Lua', E'Um urso guloso confunde a lua com um queijo e sai numa aventura noturna.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/urso-lua.png', (SELECT id FROM public.categories WHERE name = E'Animais'), TRUE, NOW(), NOW()),
  (E'3e891746-11bb-55bf-a601-d318a1b9d98f', E'O Dragão que Não Sabia Soltar Fogo', E'Um pequeno dragão tenta descobrir seu dom verdadeiro enquanto todos esperam que ele solte fogo.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/dragao-sem-fogo.png', (SELECT id FROM public.categories WHERE name = E'Fantasia'), TRUE, NOW(), NOW()),
  (E'457aa37d-ab64-5226-8ab0-ce8842bfdaec', E'A Menina que Encontrou um Arco-Íris', E'Uma menina atravessa um arco-íris escondido e descobre um lugar onde cada cor tem um poder diferente.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/menina-arco-iris.png', (SELECT id FROM public.categories WHERE name = E'Fantasia'), TRUE, NOW(), NOW()),
  (E'd05a6209-8fd1-5327-8406-834d59b48b40', E'A Baleia que Queria Conhecer as Estrelas', E'Uma pequena baleia sonhadora encontra um jeito mágico de tocar o céu e conversar com as estrelas.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/baleia-estrelas.png', (SELECT id FROM public.categories WHERE name = E'Animais'), TRUE, NOW(), NOW()),
  (E'656f4643-74e8-5a0f-8f5c-75d10aecd65f', E'O Brinquedo que Ganhou Vida', E'Em uma noite de tempestade, um velho ursinho ganha vida e sai do quarto para viver sua primeira aventura.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/brinquedo-ganhou-vida.png', (SELECT id FROM public.categories WHERE name = E'Fantasia'), TRUE, NOW(), NOW()),
  (E'ee869a44-528d-5ba2-888a-1e3afdccb4ec', E'A Árvore que Guardava Segredos', E'No coração da floresta, uma árvore muito antiga sussurra segredos para quem sabe ouvir com calma.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/arvore-segredos.png', (SELECT id FROM public.categories WHERE name = E'Natureza'), TRUE, NOW(), NOW()),
  (E'647c4e62-fe82-5d81-ad70-5360219ae744', E'O Passarinho que Esqueceu de Voar', E'Um passarinho descobre que a coragem pode estar escondida bem perto, mesmo quando as asas tremem.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/passarinho-esqueceu-voar.png', (SELECT id FROM public.categories WHERE name = E'Animais'), TRUE, NOW(), NOW()),
  (E'2274d4b1-1201-5732-a96a-363911e74d52', E'O Relógio que Parou o Tempo', E'Um garoto encontra um relógio antigo capaz de parar o tempo e descobre que cada segundo tem valor.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/relogio-parou-tempo.png', (SELECT id FROM public.categories WHERE name = E'Ciência'), TRUE, NOW(), NOW()),
  (E'1edc25e9-3b19-52a8-a691-5568e57816cd', E'A Concha que Contava Histórias', E'Uma concha encontrada na praia revela aventuras escondidas no fundo do mar sempre que alguém a escuta com atenção.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/concha-contava-historias.png', (SELECT id FROM public.categories WHERE name = E'Natureza'), TRUE, NOW(), NOW()),
  (E'6a86b97a-d34a-5f1f-8947-3f41a8527663', E'A Raposa e a Porta Secreta', E'Uma raposa encontra uma porta misteriosa na floresta e descobre um lugar onde desejos verdadeiros podem florescer.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/raposa-porta-secreta.png', (SELECT id FROM public.categories WHERE name = E'Animais'), TRUE, NOW(), NOW()),
  (E'5fc84527-ed27-531b-b3c4-868b204b406b', E'O Menino que Plantava Nuvens', E'Um menino descobre sementes mágicas capazes de fazer nascer nuvens e tenta salvar uma vila sem chuva.', E'https://jormqonbmlbouvzcggfc.supabase.co/storage/v1/object/public/story-images/stories/menino-plantava-nuvens.png', (SELECT id FROM public.categories WHERE name = E'Natureza'), TRUE, NOW(), NOW())
ON CONFLICT (id) DO UPDATE
SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  cover_image = EXCLUDED.cover_image,
  category_id = EXCLUDED.category_id,
  is_published = EXCLUDED.is_published,
  updated_at = EXCLUDED.updated_at;

DELETE FROM public.story_pages
WHERE story_id IN (E'beb8697e-7aca-5b90-ac86-454665d3edb5', E'25c39e73-d41e-5b3a-a70d-c2ca3287a5eb', E'89c7fbfe-ff2e-5ebf-a891-e80d0059e1f4', E'45a01f17-d4ff-5794-a289-57d078994f11', E'82e84d85-d825-5e05-a15d-62c57dcaf98b', E'5e8fbbc7-50fb-5e75-ba51-bad5d6142cf1', E'96e55cac-68fa-5d52-9680-1680edf12801', E'b3f7b18e-fde2-5c68-8aff-fcc969bb604e', E'3e891746-11bb-55bf-a601-d318a1b9d98f', E'457aa37d-ab64-5226-8ab0-ce8842bfdaec', E'd05a6209-8fd1-5327-8406-834d59b48b40', E'656f4643-74e8-5a0f-8f5c-75d10aecd65f', E'ee869a44-528d-5ba2-888a-1e3afdccb4ec', E'647c4e62-fe82-5d81-ad70-5360219ae744', E'2274d4b1-1201-5732-a96a-363911e74d52', E'1edc25e9-3b19-52a8-a691-5568e57816cd', E'6a86b97a-d34a-5f1f-8947-3f41a8527663', E'5fc84527-ed27-531b-b3c4-868b204b406b');

INSERT INTO public.story_pages (
  id,
  story_id,
  page_number,
  text,
  image_url,
  created_at
)
VALUES
  (E'b5eef9bd-0169-53a6-9e5d-da01575fe7c2', E'beb8697e-7aca-5b90-ac86-454665d3edb5', 1, E'Era uma vez uma raposinha chamada Fifi que morava perto da colina florida.', NULL, NOW()),
  (E'897b28f9-9e2c-5884-9a08-fb49add3987b', E'beb8697e-7aca-5b90-ac86-454665d3edb5', 2, E'Toda noite, Fifi via estrelas caindo do céu e queria descobrir onde elas iam parar.', NULL, NOW()),
  (E'a952d2d5-2044-5290-b537-947635cf6a78', E'beb8697e-7aca-5b90-ac86-454665d3edb5', 3, E'Certa noite, ela seguiu uma trilha brilhante até um lago escondido cheio de luzinhas...', NULL, NOW()),
  (E'1144ae49-f904-5cf3-9495-c50bbd74a18b', E'beb8697e-7aca-5b90-ac86-454665d3edb5', 4, E'As estrelas dançavam na água! Fifi guardou uma no bolso e voltou para casa sorrindo.', NULL, NOW()),
  (E'94c16df5-e195-569a-98df-e6576910a5d2', E'25c39e73-d41e-5b3a-a70d-c2ca3287a5eb', 1, E'Bia e Nico encontraram uma escada dourada aparecendo no fundo do quintal.', NULL, NOW()),
  (E'd8598bd0-2593-5fff-8b3b-c45983071e81', E'25c39e73-d41e-5b3a-a70d-c2ca3287a5eb', 2, E'Subiram, subiram... até chegar num castelo feito de nuvens fofinhas.', NULL, NOW()),
  (E'2f223be5-2e0e-5022-83de-2f56095f78b4', E'25c39e73-d41e-5b3a-a70d-c2ca3287a5eb', 3, E'Lá conheceram o Rei do Vento, que lhes ensinou a assobiar canções da chuva.', NULL, NOW()),
  (E'e0bab7b1-fd2d-5c5a-8916-ebad744bf1bb', E'89c7fbfe-ff2e-5ebf-a891-e80d0059e1f4', 1, E'Otto misturou limão, mel e um pouquinho de imaginação.', NULL, NOW()),
  (E'412cebbb-02a5-5d23-83d7-45c839f8f806', E'89c7fbfe-ff2e-5ebf-a891-e80d0059e1f4', 2, E'O foguete tremeu e subiu direto para a Lua!', NULL, NOW()),
  (E'3cc88cae-f69d-5b1c-a21d-fcf6d2174d88', E'89c7fbfe-ff2e-5ebf-a891-e80d0059e1f4', 3, E'Lá, ele plantou uma semente e voltou para o café da manhã.', NULL, NOW()),
  (E'6fa393c2-b03a-5a05-bbd0-c329a6e79b1b', E'45a01f17-d4ff-5794-a289-57d078994f11', 1, E'Rex morava numa floresta antiga e nunca ninguém tinha ouvido o seu rugido.', NULL, NOW()),
  (E'feeca7ea-2744-59c2-b578-69245bad43a8', E'45a01f17-d4ff-5794-a289-57d078994f11', 2, E'Um passarinho corajoso ensinou Rex a respirar fundo e soltar a voz...', NULL, NOW()),
  (E'46ac0532-5ece-581b-be17-c16ec313654b', E'45a01f17-d4ff-5794-a289-57d078994f11', 3, E'ROOOAAAR! A floresta inteira aplaudiu.', NULL, NOW()),
  (E'f2cdf2a7-943e-5011-8e03-6cba4a782f61', E'82e84d85-d825-5e05-a15d-62c57dcaf98b', 1, E'Pérola desenhou um mapa cheio de X vermelhos e zarpou.', NULL, NOW()),
  (E'a36a5d1a-de93-57e5-965c-e63d7e1f7732', E'82e84d85-d825-5e05-a15d-62c57dcaf98b', 2, E'Enfrentou tempestades, polvos gentis e uma ilha feita de balas.', NULL, NOW()),
  (E'48ceb9da-eec0-567f-a4e9-f62c1dbd0c0a', E'82e84d85-d825-5e05-a15d-62c57dcaf98b', 3, E'O tesouro? Fazer novos amigos em cada porto.', NULL, NOW()),
  (E'bc4cb208-0eb5-5278-9261-e6c10fddbd04', E'5e8fbbc7-50fb-5e75-ba51-bad5d6142cf1', 1, E'A sementinha espiou pra fora da terra bem antes da hora.', NULL, NOW()),
  (E'7a76f8d3-d8a2-51a0-a934-72aaee5b5941', E'5e8fbbc7-50fb-5e75-ba51-bad5d6142cf1', 2, E'Sentiu chuva, vento, sol — e virou a árvore mais alta do jardim.', NULL, NOW()),
  (E'1c1446e6-ca79-5221-87e6-18a59098f9e5', E'96e55cac-68fa-5d52-9680-1680edf12801', 1, E'Cléo pegou uma lanterna, um copo de água e descobriu um arco-íris.', NULL, NOW()),
  (E'678f32cc-8dfa-589d-b897-0a2a35b84965', E'96e55cac-68fa-5d52-9680-1680edf12801', 2, E'A luz é mágica — e a ciência é a linguagem dessa mágica.', NULL, NOW()),
  (E'e1fbf62a-1dd4-5cb9-8374-452d9b9a89da', E'b3f7b18e-fde2-5c68-8aff-fcc969bb604e', 1, E'O urso Bento achou que a lua era um pedaço de queijo.', NULL, NOW()),
  (E'd343ac2e-3776-5033-9b9b-d241f4cdb664', E'b3f7b18e-fde2-5c68-8aff-fcc969bb604e', 2, E'Subiu na árvore mais alta e mordeu... uma nuvem doce!', NULL, NOW()),
  (E'1accdd19-b220-5c1d-bd14-e9dee7b819ec', E'3e891746-11bb-55bf-a601-d318a1b9d98f', 1, E'Dudu era um pequeno dragão que vivia no alto da Montanha das Brasas, onde todos os filhotes já treinavam grandes labaredas brilhantes.', NULL, NOW()),
  (E'406ccc1f-bfdd-53d5-b187-846adfe0cd52', E'3e891746-11bb-55bf-a601-d318a1b9d98f', 2, E'Mas, sempre que Dudu enchia o peito e tentava soltar fogo, saíam apenas bolhas coloridas que flutuavam pelo ar e faziam os outros dragões rirem.', NULL, NOW()),
  (E'a42d9b2d-1bb4-5047-bdad-a8ea23ae29a0', E'3e891746-11bb-55bf-a601-d318a1b9d98f', 3, E'Certo dia, uma neblina escura cobriu a montanha e ninguém conseguia enxergar o caminho até as cavernas. Foi então que as bolhas de Dudu começaram a brilhar como lanternas no céu.', NULL, NOW()),
  (E'4894da2e-ed43-54a5-a0d0-79f592241c60', E'3e891746-11bb-55bf-a601-d318a1b9d98f', 4, E'Guiados por aquela luz dançante, todos chegaram em segurança. Naquela noite, Dudu descobriu que seu dom não era queimar, e sim iluminar o caminho de quem precisava.', NULL, NOW()),
  (E'd6742680-2693-567e-b40c-79bcfcf6d793', E'457aa37d-ab64-5226-8ab0-ce8842bfdaec', 1, E'Nina adorava subir a colina atrás de casa para ver o céu depois da chuva. Foi lá que ela encontrou um arco-íris escondido atrás da montanha.', NULL, NOW()),
  (E'aecb5ada-8a6d-512e-9640-efda01f00828', E'457aa37d-ab64-5226-8ab0-ce8842bfdaec', 2, E'Quando tocou a primeira cor com a ponta dos dedos, ouviu um sussurro suave chamando seu nome. Sem pensar duas vezes, atravessou aquele portal brilhante.', NULL, NOW()),
  (E'9df9728c-257f-5349-bc7b-71ca80d1ccf4', E'457aa37d-ab64-5226-8ab0-ce8842bfdaec', 3, E'Do outro lado havia um vale encantado: o vermelho aquecia corações, o azul acalmava rios, o amarelo fazia flores acordarem, e o verde curava árvores cansadas.', NULL, NOW()),
  (E'ac242fec-d03b-5fbf-aa8a-eb7d62e342f9', E'457aa37d-ab64-5226-8ab0-ce8842bfdaec', 4, E'Ao voltar para casa, Nina percebeu que carregava um pedacinho de cada cor dentro de si. Desde então, espalhava coragem, alegria e calma por onde passava.', NULL, NOW()),
  (E'ce05ac5a-9cc8-5945-82cc-1da1e2948c37', E'd05a6209-8fd1-5327-8406-834d59b48b40', 1, E'Luna era uma baleinha curiosa que passava as noites boiando na superfície do mar, olhando para o céu como se quisesse guardar cada estrela dentro dos olhos.', NULL, NOW()),
  (E'ce3a3d02-6f04-59d9-95d0-c25900706ed3', E'd05a6209-8fd1-5327-8406-834d59b48b40', 2, E'Ela perguntava às ondas como podia chegar tão alto, mas as ondas apenas riam e diziam que as estrelas pertenciam ao céu.', NULL, NOW()),
  (E'99f18c04-8ca5-5470-bef8-0db8a1b95a56', E'd05a6209-8fd1-5327-8406-834d59b48b40', 3, E'Numa noite muito silenciosa, uma estrela cadente caiu sobre o mar e deixou um rastro de luz prateada. Luna seguiu aquele caminho brilhante e sentiu seu coração ficar leve como espuma.', NULL, NOW()),
  (E'7a9d5c8c-aa8f-5a6c-9530-9d5131755201', E'd05a6209-8fd1-5327-8406-834d59b48b40', 4, E'De repente, saltou tão alto que pareceu tocar o firmamento. As estrelas a cumprimentaram com pequenos brilhos, e Luna voltou sabendo que, às vezes, sonhar forte já é um jeito de chegar.', NULL, NOW()),
  (E'42474bda-e88d-518f-adad-eed20e2fb838', E'656f4643-74e8-5a0f-8f5c-75d10aecd65f', 1, E'Durante uma noite de chuva forte, um relâmpago iluminou o quarto de Lia e tocou bem de leve o velho ursinho esquecido na prateleira.', NULL, NOW()),
  (E'871f67cd-d891-59d1-be1f-df679bc0c248', E'656f4643-74e8-5a0f-8f5c-75d10aecd65f', 2, E'No mesmo instante, os olhinhos de botão se abriram e o ursinho piscou, surpreso por finalmente poder esticar os braços e mexer as patinhas.', NULL, NOW()),
  (E'2af7a338-ede6-5a53-979c-2b18adbc8927', E'656f4643-74e8-5a0f-8f5c-75d10aecd65f', 3, E'Antes que o sol aparecesse, ele decidiu conhecer a casa inteira: atravessou o corredor escuro, desceu a escada rolando devagar e encontrou a cozinha cheirando a biscoito.', NULL, NOW()),
  (E'd7ee4c01-93ef-527f-97a6-e57134e98ff4', E'656f4643-74e8-5a0f-8f5c-75d10aecd65f', 4, E'Quando voltou para o quarto, o ursinho já não parecia mais esquecido. Lia o abraçou pela manhã e sentiu, sem entender por quê, que ele estava quentinho de aventura.', NULL, NOW()),
  (E'78b84988-95bb-5790-b707-88ff662368b0', E'ee869a44-528d-5ba2-888a-1e3afdccb4ec', 1, E'No meio da floresta existia uma árvore tão antiga que suas raízes pareciam abraçar a terra desde o começo do mundo.', NULL, NOW()),
  (E'f0c804ad-93df-5d64-a38a-7bbc4808f924', E'ee869a44-528d-5ba2-888a-1e3afdccb4ec', 2, E'Muitos tentavam arrancar dela respostas apressadas, mas tudo o que ouviam era o balanço das folhas e o vento passando pelos galhos.', NULL, NOW()),
  (E'ba318f86-dc1b-5227-8e01-a3565f5a2945', E'ee869a44-528d-5ba2-888a-1e3afdccb4ec', 3, E'Um dia, uma menina chamada Joana sentou-se quietinha ao seu lado e ficou ouvindo o som da mata sem fazer nenhuma pergunta. Então o tronco rangeu baixinho, como se despertasse.', NULL, NOW()),
  (E'2c2d26de-4fca-5adf-acf6-ff19d368f225', E'ee869a44-528d-5ba2-888a-1e3afdccb4ec', 4, E'A árvore lhe contou que os rios nascem pacientes, que as sementes crescem no silêncio e que a natureza fala baixinho com quem aprende a escutar de verdade.', NULL, NOW()),
  (E'ba0c0851-fbdd-5d1d-9cb7-fa0e7229f9ad', E'647c4e62-fe82-5d81-ad70-5360219ae744', 1, E'Nino acordou numa manhã ensolarada, abriu as asinhas para sair do ninho e, de repente, sentiu um medo tão grande que esqueceu como voar.', NULL, NOW()),
  (E'ca538b68-2064-57ca-8509-573e388bd499', E'647c4e62-fe82-5d81-ad70-5360219ae744', 2, E'Tentou uma vez, depois outra, mas suas penas tremiam e ele logo voltava para o galho, com o coração batendo depressa.', NULL, NOW()),
  (E'60e0fa58-acb0-534b-851e-f1f7a75abff6', E'647c4e62-fe82-5d81-ad70-5360219ae744', 3, E'Seus amigos apareceram aos poucos: a borboleta mostrou como confiar no vento, o esquilo ensinou a respirar fundo, e a joaninha disse que coragem também começa pequenininha.', NULL, NOW()),
  (E'e14148c7-1f8a-5b84-bfd3-3b6fb4f23a19', E'647c4e62-fe82-5d81-ad70-5360219ae744', 4, E'Quando Nino pulou de novo, percebeu que o céu ainda era o mesmo amigo de sempre. E descobriu que voar não era não sentir medo, mas seguir mesmo com as asas tremendo.', NULL, NOW()),
  (E'01ce61c2-11bd-5e78-b8e4-c08616445369', E'2274d4b1-1201-5732-a96a-363911e74d52', 1, E'Miguel encontrou um relógio antigo no fundo de uma lojinha empoeirada, escondido entre mapas rasgados e caixas de música silenciosas.', NULL, NOW()),
  (E'60c28e95-76a6-51fd-bf3d-0582dcb34855', E'2274d4b1-1201-5732-a96a-363911e74d52', 2, E'O vendedor sorriu de um jeito estranho e disse apenas: ''Gire os ponteiros com cuidado''. Curioso, Miguel fez isso assim que chegou em casa.', NULL, NOW()),
  (E'0cde8c82-ed9e-50fa-bbf9-080d2b891d64', E'2274d4b1-1201-5732-a96a-363911e74d52', 3, E'No mesmo instante, tudo parou. As folhas ficaram imóveis no ar, a água congelou no meio do copo e até o gato do vizinho ficou suspenso num pulo engraçado.', NULL, NOW()),
  (E'a3cab565-39ae-52f6-8853-6c939452bf51', E'2274d4b1-1201-5732-a96a-363911e74d52', 4, E'Miguel andou por aquele mundo quieto e percebeu que o tempo é precioso justamente porque nunca fica parado. Quando fez o relógio voltar a funcionar, prometeu aproveitar melhor cada minuto.', NULL, NOW()),
  (E'950dd9ff-66a4-5bfe-8bc5-156e4ddff387', E'1edc25e9-3b19-52a8-a691-5568e57816cd', 1, E'Sofia passeava pela praia ao amanhecer quando encontrou uma concha diferente, com brilhos cor-de-pérola e desenhos em espiral por toda parte.', NULL, NOW()),
  (E'2e7895d6-f957-5eb3-b066-b13a6f01c7f9', E'1edc25e9-3b19-52a8-a691-5568e57816cd', 2, E'Ao encostá-la no ouvido, em vez do som do mar, ela ouviu uma voz suave contando sobre cavalos-marinhos dançarinos e jardins de coral iluminados.', NULL, NOW()),
  (E'8d04d0ae-fa65-5fe6-afe8-c0fddf6ee383', E'1edc25e9-3b19-52a8-a691-5568e57816cd', 3, E'Cada vez que escutava a concha, uma nova aventura aparecia: tartarugas que guardavam mapas, peixes-lanterna que iluminavam cavernas e sereias que sabiam os nomes das estrelas.', NULL, NOW()),
  (E'63a50a38-f30a-575f-8179-32c3a6b4fcd5', E'1edc25e9-3b19-52a8-a691-5568e57816cd', 4, E'Sofia aprendeu que o fundo do mar era feito de histórias esperando alguém parar, escutar e acreditar um pouquinho mais na magia do mundo.', NULL, NOW()),
  (E'766fed6f-9048-5494-9ad3-d3072b2c8dc8', E'6a86b97a-d34a-5f1f-8947-3f41a8527663', 1, E'Numa trilha escondida da floresta, uma pequena raposa encontrou uma porta azul encostada entre duas árvores, como se alguém a tivesse esquecido ali.', NULL, NOW()),
  (E'ae2a9e8d-7439-56dc-af80-fe032c9a665f', E'6a86b97a-d34a-5f1f-8947-3f41a8527663', 2, E'Quando empurrou a maçaneta dourada, a porta se abriu para um campo secreto onde os animais podiam sussurrar seus maiores desejos ao vento.', NULL, NOW()),
  (E'0e924e1f-1a0b-575e-89db-3a30082e107c', E'6a86b97a-d34a-5f1f-8947-3f41a8527663', 3, E'Uns pediam coragem, outros queriam amizade, e alguns desejavam apenas voltar a sorrir. A raposa observou tudo com olhos brilhando de curiosidade.', NULL, NOW()),
  (E'5b1a37dd-c954-588f-8f8f-a92ac8bd96ae', E'6a86b97a-d34a-5f1f-8947-3f41a8527663', 4, E'Quando chegou sua vez, ela não pediu nada só para si. Desejou que todos ali encontrassem o que faltava em seus corações. E naquele instante, o campo inteiro se encheu de luz.', NULL, NOW()),
  (E'6742a934-47b1-5eed-814b-8c390af5f71e', E'5fc84527-ed27-531b-b3c4-868b204b406b', 1, E'Téo morava numa vila onde a terra começava a rachar de sede, porque fazia muito tempo que nenhuma nuvem aparecia no céu.', NULL, NOW()),
  (E'84fe2296-2ce7-5c3d-8d49-7fa51ae34f4b', E'5fc84527-ed27-531b-b3c4-868b204b406b', 2, E'Um dia, encontrou um saquinho de sementes prateadas deixado pelo vento no quintal. Quando as plantou, pequenos tufos brancos começaram a crescer como algodão.', NULL, NOW()),
  (E'446c5e86-8395-5d2d-a9a3-ddb7786cbfcb', E'5fc84527-ed27-531b-b3c4-868b204b406b', 3, E'Téo regou aquelas nuvens com esperança, canto e paciência. Logo elas subiram devagar para o céu, ficando maiores, mais macias e mais carregadas.', NULL, NOW()),
  (E'9ce0b8a1-8a86-5c0b-9e8a-4308072e0dcd', E'5fc84527-ed27-531b-b3c4-868b204b406b', 4, E'Na primeira chuva, a vila inteira saiu para dançar. E Téo descobriu que até o céu floresce quando alguém acredita o suficiente para plantar o impossível.', NULL, NOW());

COMMIT;
