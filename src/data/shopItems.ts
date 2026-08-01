export type ShopItem = {
  id: string
  name: string
  stock: number
  price: number
  category: 'divine_s' | 'divine_limited' | 'divine_dist' | 'other'
  image?: string
}

const img = (file: string) => import.meta.env.BASE_URL + 'img/' + file

export const SHOP_ITEMS: ShopItem[] = [
  // 在庫2 / 単価2,400（フェス限）
  { id: 'kei', name: 'ケイの神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Kei_Fragment.png') },
  { id: 'alice_combat', name: 'アリス（臨戦）の神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Alice_Armed_Fragment.png') },
  { id: 'mika_swim', name: 'ミカ（水着）の神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Mika_Swimsuit_Fragment.png') },
  { id: 'nagisa_swim', name: 'ナギサ（水着）の神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Nagisa_Swimsuit_Fragment.png') },
  { id: 'nel_uniform', name: 'ネル（制服）の神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Neru_Schoolgirl_Fragment.png') },
  { id: 'rio', name: 'リオの神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Rio_Fragment.png') },
  { id: 'hoshino_combat', name: 'ホシノ（臨戦）の神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Hoshino_Armed_Fragment.png') },
  { id: 'shiroko_terror', name: 'シロコ＊テラーの神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Shiroko_Terror_Fragment.png') },
  { id: 'hina_dress', name: 'ヒナ（ドレス）の神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Hina_Dress_Fragment.png') },
  { id: 'hanako_swim', name: 'ハナコ（水着）の神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Hanako_Swimsuit_Fragment.png') },
  { id: 'mika', name: 'ミカの神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Mika_Fragment.png') },
  { id: 'hoshino_swim', name: 'ホシノ（水着）の神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Hoshino_Swimsuit_Fragment.png') },
  { id: 'wakamo', name: 'ワカモの神名文字x5', stock: 2, price: 2400, category: 'divine_s', image: img('Wakamo_Fragment.png') },

  // 在庫6 / 単価1,800（配布）
  { id: 'atsuko_swim', name: 'アツコ（水着）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Atsuko_Swimsuit_Fragment.png') },
  { id: 'airi_band', name: 'アイリ（バンド）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Airi_Band_Fragment.png') },
  { id: 'otogi', name: 'オトギの神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Otogi_Fragment.png') },
  { id: 'toki_combat', name: 'トキ（臨戦）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Toki_Armed_Fragment.png') },
  { id: 'koharu_swim', name: 'コハル（水着）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Koharu_Swimsuit_Fragment.png') },
  { id: 'miyu_swim', name: 'ミユ（水着）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Miyu_Swimsuit_Fragment.png') },
  { id: 'junko_newyear', name: 'ジュンコ（正月）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Junko_New_Year_Fragment.png') },
  { id: 'yuzu_maid', name: 'ユズ（メイド）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Yuzu_Maid_Fragment.png') },
  { id: 'hasumi_gym', name: 'ハスミ（体操服）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Hasumi_Gym_Fragment.png') },
  { id: 'hibiki_cheer', name: 'ヒビキ（応援団）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Hibiki_Cheerleader_Fragment.png') },
  { id: 'shizuko_swim', name: 'シズコ（水着）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Shizuko_Swimsuit_Fragment.png') },
  { id: 'ayane_swim', name: 'アヤネ（水着）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Ayane_Swimsuit_Fragment.png') },
  { id: 'michiru', name: 'ミチルの神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Michiru_Fragment.png') },
  { id: 'fubuki', name: 'フブキの神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Fubuki_Fragment.png') },
  { id: 'tomoe', name: 'トモエの神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Tomoe_Fragment.png') },
  { id: 'izumi_swim', name: 'イズミ（水着）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Izumi_Swimsuit_Fragment.png') },
  { id: 'tsurugi_swim', name: 'ツルギ（水着）の神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Tsurugi_Swimsuit_Fragment.png') },
  { id: 'nodoka', name: 'ノドカの神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Nodoka_Fragment.png') },
  { id: 'nonomi', name: 'ノノミの神名文字x5', stock: 6, price: 1800, category: 'divine_dist', image: img('Nonomi_Fragment.png') },

  // 在庫2 / 単価1,800（限定）
  { id: 'rio_combat', name: 'リオ（臨戦）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Rio_Armed_Fragment.png') },
  { id: 'himari_combat', name: 'ヒマリ（臨戦）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Himari_Armed_Fragment.png') },
  { id: 'reisa_magical', name: 'レイサ（マジカル）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Reisa_Magical_Fragment.png') },
  { id: 'suzumi_magical', name: 'スズミ（マジカル）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Suzumi_Magical_Fragment.png') },
  { id: 'hasumi_swim', name: 'ハスミ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Hasumi_Swimsuit_Fragment.png') },
  { id: 'seia_swim', name: 'セイア（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Seia_Swimsuit_Fragment.png') },
  { id: 'nozomi', name: 'ノゾミの神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Nozomi_Fragment.png') },
  { id: 'hikari', name: 'ヒカリの神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Hikari_Fragment.png') },
  { id: 'asuna_uniform', name: 'アスナ（制服）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Asuna_Schoolgirl_Fragment.png') },
  { id: 'seia', name: 'セイアの神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Seia_Fragment.png') },
  { id: 'sakurako_idol', name: 'サクラコ（アイドル）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Sakurako_Idol_Fragment.png') },
  { id: 'marie_idol', name: 'マリー（アイドル）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Mari_Idol_Fragment.png') },
  { id: 'hiyori_swim', name: 'ヒヨリ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Hiyori_Swimsuit_Fragment.png') },
  { id: 'saori_swim', name: 'サオリ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Saori_Swimsuit_Fragment.png') },
  { id: 'yoshimi_band', name: 'ヨシミ（バンド）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Yoshimi_Band_Fragment.png') },
  { id: 'kazusa_band', name: 'カズサ（バンド）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Kazusa_Band_Fragment.png') },
  { id: 'ako_dress', name: 'アコ（ドレス）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Ako_Dress_Fragment.png') },
  { id: 'makoto', name: 'マコトの神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Makoto_Fragment.png') },
  { id: 'ui_swim', name: 'ウイ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Ui_Swimsuit_Fragment.png') },
  { id: 'hinata_swim', name: 'ヒナタ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Hinata_Swimsuit_Fragment.png') },
  { id: 'nagisa', name: 'ナギサの神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Nagisa_Fragment.png') },
  { id: 'toki', name: 'トキの神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Toki_Fragment.png') },
  { id: 'haruna_newyear', name: 'ハルナ（正月）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Haruna_New_Year_Fragment.png') },
  { id: 'fuuka_newyear', name: 'フウカ（正月）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Fuuka_New_Year_Fragment.png') },
  { id: 'yuuka_gym', name: 'ユウカ（体操服）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Yuuka_Gym_Fragment.png') },
  { id: 'marie_gym', name: 'マリー（体操服）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Mari_Gym_Fragment.png') },
  { id: 'izuna_swim', name: 'イズナ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Izuna_Swimsuit_Fragment.png') },
  { id: 'chise_swim', name: 'チセ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Chise_Swimsuit_Fragment.png') },
  { id: 'aru_newyear', name: 'アル（正月）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Aru_New_Year_Fragment.png') },
  { id: 'mutsuki_newyear', name: 'ムツキ（正月）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Mutsuki_New_Year_Fragment.png') },
  { id: 'azusa_swim', name: 'アズサ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Azusa_Swimsuit_Fragment.png') },
  { id: 'mashiro_swim', name: 'マシロ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Mashiro_Swimsuit_Fragment.png') },
  { id: 'hina_swim', name: 'ヒナ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Hina_Swimsuit_Fragment.png') },
  { id: 'iori_swim', name: 'イオリ（水着）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Iori_Swimsuit_Fragment.png') },
  { id: 'nel_bunny', name: 'ネル（バニーガール）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Neru_Bunny_Girl_Fragment.png') },
  { id: 'karin_bunny', name: 'カリン（バニーガール）の神名文字x5', stock: 2, price: 1800, category: 'divine_limited', image: img('Karin_Bunny_Girl_Fragment.png') },

  // その他
  { id: 'kammei_kake', name: '神名のカケラx5', stock: 5, price: 600, category: 'other', image: img('Item_Icon_SecretStone.png') },
  { id: 'report_max', name: '最上級レポートx10', stock: 4, price: 1500, category: 'other', image: img('Item_Icon_ExpItem_3.png') },
  { id: 'titan', name: 'チタン撃針x10', stock: 2, price: 1500, category: 'other', image: img('Equipment_Icon_WeaponExpGrowthZ_3.png') },
  { id: 'credit', name: 'クレジットポイントx5000K', stock: 4, price: 1500, category: 'other', image: img('Gold.png') },
  { id: 'equip_t2', name: 'T2装備設計図選択ボックスx15', stock: 100, price: 300, category: 'other', image: img('Equipment_Icon_Selection_Tier2_Piece.png') },
  { id: 'equip_t3', name: 'T3装備設計図選択ボックスx20', stock: 100, price: 480, category: 'other', image: img('Equipment_Icon_Selection_Tier3_Piece.png') },
  { id: 'equip_t4', name: 'T4装備設計図選択ボックスx30', stock: 100, price: 840, category: 'other', image: img('Equipment_Icon_Selection_Tier4_Piece.png') },
  { id: 'equip_t5', name: 'T5装備設計図選択ボックスx35', stock: 100, price: 1260, category: 'other', image: img('Equipment_Icon_Selection_Tier5_Piece.png') },
  { id: 'equip_t6', name: 'T6装備設計図選択ボックスx40', stock: 100, price: 1600, category: 'other', image: img('Equipment_Icon_Selection_Tier6_Piece.png') },
  { id: 'equip_t7', name: 'T7装備設計図選択ボックスx45', stock: 100, price: 2000, category: 'other', image: img('Equipment_Icon_Selection_Tier7_Piece.png') },
  { id: 'equip_t8', name: 'T8装備設計図選択ボックスx50', stock: 100, price: 2400, category: 'other', image: img('Equipment_Icon_Selection_Tier8_Piece.png') },
  { id: 'equip_t9', name: 'T9装備設計図選択ボックスx55', stock: 100, price: 2800, category: 'other', image: img('Equipment_Icon_Selection_Tier9_Piece.png') },
]

export const WEEKLY_CAP = 12000
export const MONTHLY_BONUS = 2000
export const HALF_MONTHLY_BONUS = 1000

export const DAY_OF_WEEK_LABELS = ['日', '月', '火', '水', '木', '金', '土']
