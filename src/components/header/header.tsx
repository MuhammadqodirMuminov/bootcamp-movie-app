import Image from "next/image";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineSearch, AiOutlineLogout } from "react-icons/ai";
import { BiBell } from "react-icons/bi";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "src/context/auth.context";
import logo from "../../public/logo.svg";
import Link from "next/link";

const Header = () => {
	const [scrolled, setScrolled] = useState(false);
	const { logOut } = useContext(AuthContext);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`${
				scrolled
					? "bg-[#E10856] shadow-lg z-50"
					: "bg-[#1D1D1D]/20 shadow-lg z-50 "
			} `}>
			<div className="flex items-center space-x-2 md:space-x-10">
				<Image
					src={logo}
					alt={"logo"}
					width={56}
					height={56}
					className={"cursor-pointer object-contain"}
				/>
				<ul className="space-x-4 md:flex hidden">
					<li className="navLink">Home</li>
					<li className="navLink">Movies</li>
					<li className="navLink">Tv Shows</li>
					<li className="navLink">New</li>
					<li className="navLink">Popular</li>
				</ul>
			</div>
			<div className="flex items-center space-x-4 text-sm font-light">
				<AiOutlineSearch className="w-6 h-6 cursor-pointer" />
				<p className="hidden lg:inline text-sm">Kids</p>
				<BiBell className="w-6 h-6 cursor-pointer" />
				<Link href="/account">
					<VscAccount className="w-6 h-6 cursor-pointer" />
				</Link>
				<AiOutlineLogout
					className="w-6 h-6 cursor-pointer"
					onClick={logOut}
				/>
			</div>
		</header>
	);
};

export default Header;
