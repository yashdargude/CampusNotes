import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { BookOpenIcon, ChatBubbleLeftRightIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [active, setActive] = useState(1);

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 border-r-2 border-gray-100">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Menu
        </Typography>
      </div>
      <List>
        <NavLink to={'/notes'} className={({ isActive }) => (isActive ? setActive(1) : null)}>
          <ListItem selected={active == 1 ? true : false}>
            <ListItemPrefix>
              <BookOpenIcon className="h-5 w-5" />
            </ListItemPrefix>
            Notes
          </ListItem>
        </NavLink>

        <NavLink to={'/profile'} className={({ isActive }) => (isActive ? setActive(2) : null)}>
          <ListItem selected={active == 2 ? true : false}>
            <ListItemPrefix>
              <UserIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </NavLink>

        <NavLink to={'/viewnotes'} className={({ isActive }) => (isActive ? setActive(3) : null)}>
          <ListItem selected={active == 3 ? true : false}>
            <ListItemPrefix>
              <MagnifyingGlassIcon className="h-5 w-5" />
            </ListItemPrefix>
            Search Notes
          </ListItem>
        </NavLink>

        <NavLink to={'/Chat'} className={({ isActive }) => (isActive ? setActive(4) : null)}>
          <ListItem selected={active == 4 ? true : false}>
            <ListItemPrefix>
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
            </ListItemPrefix>
            Chat
          </ListItem>
        </NavLink>


      </List>
    </Card>
  );
}