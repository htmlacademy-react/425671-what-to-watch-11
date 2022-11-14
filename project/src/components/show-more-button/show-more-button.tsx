import { useAppDispatch } from '../../hooks';
import { filmsOpenAdd } from '../../store/action';

export default function ShowMoreButton(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => dispatch(filmsOpenAdd())}>Show more</button>
    </div>
  );
}
