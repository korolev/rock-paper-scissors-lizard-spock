import { createContext, PropsWithChildren, useState } from "react";
import { IPlayer } from "../interfaces/players";

export interface IAppContext {
	currentPlayerId: string | null;
	players: IPlayer[];
	setCurrentPlayerId?: (playerId: string) => void;
	setPlayers?: (players: IPlayer[]) => void;
}

export const AppContext = createContext<IAppContext>({
	currentPlayerId: null,
	players: [],
});

export const AppContextProvider = ({
	currentPlayerId,
	players,
	children,
}: PropsWithChildren<IAppContext>): JSX.Element => {
	const [id, setId] = useState<string | null>(currentPlayerId);
	const [list, setList] = useState<IPlayer[]>(players);
	return (
		<AppContext.Provider
			value={{
				currentPlayerId: id,
				setCurrentPlayerId: setId,
				players: list,
				setPlayers: setList,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
